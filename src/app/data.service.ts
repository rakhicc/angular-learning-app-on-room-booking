import {Injectable} from '@angular/core';
import {Layout, LayoutCapacity, Room} from "./Models/Room";
import {User} from "./Models/User";
import {map, Observable, of} from "rxjs";
import {Booking} from "./Models/Booking";
import {formatDate} from "@angular/common";
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  getBookings(date:string):Observable<Array<Booking>>{
    // @ts-ignore
    return this.client.get<Array<Booking>>(environment.restUrl+'/api/bookings/',date)
      .pipe(map(data=>{
        const bookings=new Array<Booking>();
        // @ts-ignore
        for(const booking of data){
          bookings.push(Booking.fromHttp(booking));
        }
        return bookings;
      }));
  }

  getBooking(id:number):Observable<Booking>{
    // @ts-ignore
    return this.client.get<Booking>(environment.restUrl+'/api/bookings?id=',id).pipe(
      map(data=>{
        // @ts-ignore
         Booking.fromHttp(data);
      })
    );
  }
  getRooms():Observable<Array<Room>>{// @ts-ignore
    return (this.client.get<Array<Room>>(environment.restUrl+'/api/rooms')
      .pipe(map(data=>{
        const rooms=new Array<Room>();
        for(const room of data){
          rooms.push(Room.fromHttp(room));
        }
        return rooms;
      })));
  }
  getUsers():Observable<Array<User>>{
    // @ts-ignore
    return (this.client.get<Array<User>>(environment.restUrl+'/api/users')
      .pipe(map(data=>{
        const users=new Array<User>();
        for(const user of data){
          users.push(User.fromHttp(user));
        }
        return users;
      })));
  }
  constructor(private client:HttpClient) {
  }
  updateUser(user:User):Observable<User>{
    // @ts-ignore
    return (this.client.put<User>(environment.restUrl+'/api/users',user));
  }
  addUser(userNew:User,password:string):Observable<User>{
    const fullUser={id:userNew.id,name:userNew.name,password:password};

// @ts-ignore
    return (this.client.post<User>(environment.restUrl+'/api/users',fullUser));
  }
private getCorrectedRoom(roomNew:Room){
  const correctedRoom={id:roomNew.id,name:roomNew.name,location:roomNew.location,capacities:[]};
  for(const lc of roomNew.capacities){
    let correctLayout;
    for(let member in Layout){
      // @ts-ignore
      if(Layout[member]===lc.layout){
        correctLayout=member;
      }
    }
    const correctedLayout={layout:correctLayout,capacity:lc.capacity};
    // @ts-ignore
    correctedRoom.capacities.push(correctedLayout);
  }
  return correctedRoom;
}
  addRoom(roomNew:Room):Observable<Room>{
    // @ts-ignore
    return (this.client.post<Room>(environment.restUrl+'/api/rooms',this.getCorrectedRoom(roomNew)));
  }

  updateRoom(roomNew:Room):Observable<Room>{
    // @ts-ignore
     return (this.client.put<Room>(environment.restUrl+'/api/rooms',this.getCorrectedRoom(roomNew)));
  }
  deleteRoom(id:number):Observable<any>{
    // @ts-ignore
    return (this.client.delete(environment.restUrl+'api/rooms/'+id));
  }
  deleteUser(id:number):Observable<any>{
    // repeat same as delete room
    // @ts-ignore

    return of(null);
  }
  resetPassword(id:number):Observable<any>{
    return this.client.get(environment.restUrl+'/api/users/resetPassword/'+id);
  }
  saveBooking(booking:Booking):Observable<Booking>{
    // @ts-ignore
    return of(null);
  }
  addBooking(bookingNew:Booking):Observable<Booking>{
    // @ts-ignore
    return of(null);
  }
  deleteBooking(id:number):Observable<any>{
    // @ts-ignore
    return this.client.get<Array<Booking>>(environment.restUrl+'/api/bookings/',id);
  }

}
