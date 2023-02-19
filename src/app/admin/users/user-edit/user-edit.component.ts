import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../Models/User";
import {DataService} from "../../../data.service";
import {Router} from "@angular/router";
import {FormResetService} from "../../../form-reset.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit{
  @Input()
    // @ts-ignore
  user:User;
  // @ts-ignore
  formUser:User;
  // @ts-ignore
  message:string;
  // @ts-ignore
  password:string;
  // @ts-ignore
  password2:string;
  nameIsValid=false;
  passwordsAreValid=false;
  passwordsAreMatch=false;
  // @ts-ignore
  resetUsereventSubscription:Subscription;

  @Output()
  dataChangedEvent=new EventEmitter();
  constructor(private dataservice:DataService,
              private router:Router,
              private formresetservice:FormResetService) {
  }
  ngOnInit() {
   this.initialiseForm();
   this.resetUsereventSubscription=this.formresetservice.resetUserFormEvent.subscribe(
     (user)=>{
       this.user=user;
       this.initialiseForm();
     }
   )
  }
  initialiseForm(){
    this.formUser=Object.assign({},this.user);
    this.checkIfNameIsValid();
    this.checkIfPasswordsAreValid();
  }

  onSubmit() {
    console.log('form submitted', this.formUser);
    if (this.formUser.id == null) {
      this.dataservice.addUser(this.formUser, this.password).subscribe(
        (user) => {
          this.dataChangedEvent.emit();
          this.router.navigate(['admin', 'users'], {
            queryParams: {
              action: 'view',
              id: user.id
            }
          });
        }
      )
    } else{
      this.dataservice.updateUser(this.formUser).subscribe(
        (user) => {
          this.dataChangedEvent.emit();
          this.router.navigate(['admin', 'users'], {
            queryParams: {
              action: 'view',
              id: user.id
            }
          });
        },
        error=>{
          this.message='some error occurred and data does not saved. please try again';
        }
      )
  }
  }
checkIfNameIsValid(){
    if(this.formUser.name){
      this.nameIsValid= this.formUser.name.trim().length>0;
    } else {
      this.nameIsValid=false;
    }

}
checkIfPasswordsAreValid(){
    if(this.formUser.id !=null){
      this.passwordsAreMatch=true;
      this.passwordsAreValid=true;
    } else {
      this.passwordsAreMatch=this.password===this.password2;
      if(this.password){
        this.passwordsAreValid=this.password.trim().length>0;
      } else {
        this.passwordsAreValid=false;
      }
    }

}
}
