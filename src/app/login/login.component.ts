import { Component } from '@angular/core';
import {AuthService} from "../auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // @ts-ignore
  name:string;
  message='';
  // @ts-ignore
  password:string;
  constructor(private authService:AuthService,
              private router:Router,
              private route:ActivatedRoute) {
  }
onSubmit(){
    if(this.authService.authenticate(this.name,this.password)){
      //navigate
      const url=this.route.snapshot.queryParams['requested'];
      this.router.navigateByUrl(url);
    }else {
      this.message='something went wrong please try again';
    }
}
}
