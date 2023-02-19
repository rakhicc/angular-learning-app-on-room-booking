import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../Models/User";
import {DataService} from "../../../data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit{
  @Input()
  // @ts-ignore
  user:User;
  message='';
  constructor(private dataSevice:DataService,
              private router:Router) {
  }
  ngOnInit() {
  }
  editUser(){
    this.router.navigate(['admin','users'],{queryParams:{action:'edit',id:this.user.id}});
  }
  deleteUser(){
    console.log(this.user.id);
    // @ts-ignore

    this.dataSevice.deleteUser(this.user.id).subscribe(
      (next:any) =>{
        this.router.navigate(['admin','users']);
      }
    );
  }
  resetPassword(){
    this.message='reseting passowrd';
    this.dataSevice.resetPassword(this.user.id).subscribe(
      next=>{
        this.message='password reset sucessful'
      }, error => {
        this.message='something went wrong';
      }
    );
  }
}
