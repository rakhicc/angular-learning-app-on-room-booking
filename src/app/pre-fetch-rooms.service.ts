import { Injectable } from '@angular/core';
import {Resolve} from "@angular/router";
import {Observable} from "rxjs";
import {Room} from "./Models/Room";
import {DataService} from "./data.service";

@Injectable({
  providedIn: 'root'
})
export class PreFetchRoomsService implements Resolve<Observable<Array<Room>>>{

  constructor(private dataService:DataService) { }

  resolve() {
    return this.dataService.getRooms();

  }
}
