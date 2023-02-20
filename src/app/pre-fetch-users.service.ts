import { Injectable } from '@angular/core';
import {Resolve} from "@angular/router";
import {Observable} from "rxjs";
import {Room} from "./Models/Room";
import {DataService} from "./data.service";
import {User} from "./Models/User";

@Injectable({
  providedIn: 'root'
})
export class PreFetchUsersService  implements Resolve<Observable<Array<User>>>{

  constructor(private dataService:DataService) { }

  resolve() {
    return this.dataService.getUsers();

  }
}
