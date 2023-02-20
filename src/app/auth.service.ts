import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
isAuthencticated=false;
  constructor() { }
  authenticate(username:string,password:string):boolean{
    if(username==='matt' && password==='secret'){
      this.isAuthencticated=true;
    }
    return this.isAuthencticated;
  }
}
