import {Component, OnInit} from '@angular/core';
import {DataService} from "../../data.service";
import {User} from "../../Models/User";
import {ActivatedRoute, Router} from "@angular/router";
import {FormResetService} from "../../form-reset.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  // @ts-ignore
  users:Array<User>;
  // @ts-ignore
  selectedUser:User;
  // @ts-ignore
  action:string;
  message='Loading data please wait';
  loadingdata=true;
  retryAttempts=0;
  constructor(private dataService:DataService,
              private route:ActivatedRoute,
              private router:Router,
              private formresetservice:FormResetService) {
  }
  loadData(){
    this.dataService.getUsers().subscribe(
      (next)=>{
        this.users=next;
        this.processQueryParams();
        this.loadingdata=false;
      },
      (error) => {
        if(error.status===402){
          this.message='sorry you need to pay to use app';
        } else {
          this.retryAttempts++;
          if(this.retryAttempts <=10){
            this.message='trying again please wait';
            this.loadData();
          } else {
            this.message='please contact support';
          }
        }
      }
    );
  }
  processQueryParams(){
    this.route.queryParams.subscribe(
      (params) =>{
        const id=params['id'];
        this.action=params['action'];
        if(id){
          // @ts-ignore
          this.selectedUser=this.users.find(userExist=>{
            return userExist.id===+id;
          });

          console.log('selecteduser',this.selectedUser);
        }
      }
    )
  }
  ngOnInit() {
    this.loadData();

  }
  setUser(id:number){
this.router.navigate(['admin','users'],{queryParams:{id,action:'view'}});
  }
  addUser(){
    this.selectedUser=new User();
    this.router.navigate(['admin','users'],{queryParams:{action:'add'}});
    this.formresetservice.resetUserFormEvent.emit(this.selectedUser);
  }


}
