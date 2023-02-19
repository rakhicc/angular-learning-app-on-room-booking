import {EventEmitter, Injectable} from '@angular/core';
import {Room} from "./Models/Room";
import {User} from "./Models/User";

@Injectable({
  providedIn: 'root'
})
export class FormResetService {
// @ts-ignore
  resetRoomFormEvent=new EventEmitter<Room>();
  // @ts-ignore
  resetUserFormEvent=new EventEmitter<User>();
  constructor() { }
}
