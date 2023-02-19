import {Injectable} from '@angular/core';
import {Layout, LayoutCapacity, Room} from "./Models/Room";
import {User} from "./Models/User";
import {Observable, of} from "rxjs";
import {Booking} from "./Models/Booking";
import {formatDate} from "@angular/common";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // @ts-ignore
  private rooms: Array<Room>;
  // @ts-ignore
  private users:Array<User>;
  // @ts-ignore
  private bookings:Array<Booking>;
  getBookings(date:string):Observable<Array<Booking>>{
    return of(this.bookings.filter(b=>{
      return b.date===date;
    }));
  }

  getBooking(id:number):Observable<Booking>{
    console.log('dataservic egetbooking',id);
    const exactBooking=this.bookings.find(booking =>{
      return booking.id===id;
    })
    // @ts-ignore
    return of(exactBooking);
  }
  getRooms():Observable<Array<Room>>{
    return of(this.rooms);
  }
  getUsers():Observable<Array<User>>{
    return of(this.users);
  }
  constructor() {
    console.log(environment.restUrl);
    this.rooms=new Array<Room>();
    const roomOne=new Room();
    roomOne.id=1;
    roomOne.name='Room 1';
    roomOne.location='first floor';
    const capacity=new LayoutCapacity();
    capacity.layout=Layout.THEATER;
    capacity.capacity=20;
    roomOne.capacities.push(capacity);
    this.rooms.push(roomOne);
    const roomTwo=new Room();
    roomTwo.id=2;
    roomTwo.name='Room 2';
    roomTwo.location='second floor';
    const capacityTwo=new LayoutCapacity();
    capacityTwo.layout=Layout.BOARD;
    capacityTwo.capacity=30;
    roomTwo.capacities.push(capacityTwo)
    this.rooms.push(roomTwo);
    console.log('rooms',this.rooms);
    this.users=new Array<User>();
    const user1=new User();
    user1.id=1;
    user1.name='Rakhi';
    const user2=new User();
    user2.id=2;
    user2.name='Vinod';
    const user3=new User();
    user3.id=3;
    user3.name='Vamika';
    this.users.push(user1);
    this.users.push(user2);
    this.users.push(user3);
    this.bookings=new Array<Booking>();
    const booking1=new Booking();
    booking1.id=1;
    booking1.title='daily standup';
    booking1.date=formatDate(new Date(),'yyyy-MM-dd','en-GB');
    booking1.startTime='10:00';
    booking1.endTime='10:15';
    booking1.user=user1;
    booking1.room=roomOne;
    booking1.layout=Layout.BOARD;
    booking1.participants=10;
    const booking2=new Booking();
    booking2.id=2;
    booking2.title='Sprint planning';
    booking2.date=formatDate(new Date(),'yyyy-MM-dd','en-GB');
    booking2.startTime='09:00';
    booking2.endTime='10:00';
    booking2.user=user2;
    booking2.room=roomTwo;
    booking2.layout=Layout.THEATER;
    booking2.participants=20;
    this.bookings.push(booking1);
    this.bookings.push(booking2);
  }
  updateUser(user:User):Observable<User>{
    const originalUser=this.users.find(u=>{
      return u.id===user.id;
    });
    // @ts-ignore
    originalUser.name=user.name;
    // @ts-ignore
    return of(originalUser);
  }
  addUser(userNew:User,password:string):Observable<User>{
    let id=0;
    for(const user of this.users){
      if(user.id > id){
        id=user.id;
      }
    }
    userNew.id=id+1;
    this.users.push(userNew);
    return of(userNew);
  }

  addRoom(roomNew:Room):Observable<Room>{
    let id=0;
    for(const room of this.rooms){
      if(+room.id > id){
        id=+room.id;
      }
    }
    roomNew.id=(id+1);
    this.rooms.push(roomNew);
    return of(roomNew);
  }

  updateRoom(room:Room):Observable<Room>{
    const originalRoom=this.rooms.find(r=>{
      return r.id===room.id;
    })
    // @ts-ignore
    originalRoom.name=room.name;
    // @ts-ignore
    originalRoom.location=room.location;
    // @ts-ignore
    originalRoom.capacities=room.capacities;
    // @ts-ignore
    return of(originalRoom);
  }
  deleteRoom(id:number):Observable<any>{
    const room=this.rooms.find(r=>{
      return r.id===id;
    })
    // @ts-ignore
    this.rooms.splice(this.rooms.indexOf(room),1);
    return of(null);
  }
  deleteUser(id:number):Observable<any>{
    console.log('id in delete',id);
    const user=this.users.find(r=>{
      return r.id===id;
    })
    // @ts-ignore
    this.users.splice(this.users.indexOf(user),1);
    return of(null);
  }
  resetPassword(id:number):Observable<any>{
    return of(null);
  }
  saveBooking(booking:Booking):Observable<Booking>{
    const originalBooking=this.bookings.find(b=>{
      return b.id===booking.id;
    })
    // @ts-ignore
    originalBooking.title=booking.title;
    // @ts-ignore
    originalBooking.startTime=booking.startTime;
    // @ts-ignore
    originalBooking.endTime=booking.endTime;// @ts-ignore
    originalBooking.date=booking.date;// @ts-ignore
    originalBooking.participants=booking.participants;// @ts-ignore
    originalBooking.room=booking.room;// @ts-ignore
    originalBooking.user=booking.user;// @ts-ignore
    originalBooking.layout=booking.layout;
    // @ts-ignore
    return of(originalBooking);
  }
  addBooking(bookingNew:Booking):Observable<Booking>{
    let id=0;
    for(const booking of this.bookings){
      if(booking.id > id){
        id=booking.id;
      }
    }
    bookingNew.id=id+1;
    this.bookings.push(bookingNew);
    return of(bookingNew);
  }
  deleteBooking(id:number):Observable<any>{
    const bookingFind=this.bookings.find(booking =>{
      return booking.id===id;
    })
    // @ts-ignore
    this.bookings.splice(this.bookings.indexOf(bookingFind),1);
    return of(null);
  }
}
