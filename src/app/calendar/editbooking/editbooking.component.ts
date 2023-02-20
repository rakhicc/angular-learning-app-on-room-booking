import {Component, OnInit} from '@angular/core';
import {Booking} from "../../Models/Booking";
import {Layout, Room} from "../../Models/Room";
import {DataService} from "../../data.service";
import {User} from "../../Models/User";
import {ActivatedRoute, Router} from "@angular/router";
import {map} from "rxjs";

@Component({
  selector: 'app-editbooking',
  templateUrl: './editbooking.component.html',
  styleUrls: ['./editbooking.component.css']
})
export class EditbookingComponent implements OnInit{

  // @ts-ignore
  booking:Booking;
  // @ts-ignore
  rooms:Array<Room>;
  // @ts-ignore
  users:Array<User>;
  layouts=Object.keys(Layout);
  layOutEnum=Layout;
  dataLoaded=false;
  message='';

  constructor(private dataService:DataService,
              private route:ActivatedRoute,
              private router:Router) {
  }

  ngOnInit(): void {
    this.rooms=this.route.snapshot.data['rooms'];
    this.users=this.route.snapshot.data['users'];
    this.message='please wait loading data';
    const id=this.route.snapshot.queryParams['id'];
    console.log('route id is ',id);
    if(id){
    this.dataService.getBooking(+id).pipe(
      map(booking =>{
  // @ts-ignore
        booking.room=this.rooms.find(roomItem=>{
  return roomItem.id===booking.room.id;
})
        // @ts-ignore
        booking.user=this.rooms.find(userItem=>{
          return userItem.id===booking.user.id;
        })
        return booking;
      })
    ).subscribe(
      next=>{
        this.booking=next;
        this.dataLoaded=true;
        this.message='';
      }
    )
    console.log('editbook component',this.booking);
  }
    else {
      this.booking=new Booking();
      this.dataLoaded=true;
      this.message='';
    }
  }

  onSubmit(){
    if(this.booking.id){
      this.dataService.saveBooking(this.booking).subscribe(
        next=>{
          this.router.navigate(['']);
        }
      )
    } else {
      this.dataService.addBooking(this.booking).subscribe(
        next=>{
          this.router.navigate(['']);
        }
      )
    }

  }


}
