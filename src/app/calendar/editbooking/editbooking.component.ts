import {Component, OnInit} from '@angular/core';
import {Booking} from "../../Models/Booking";
import {Layout, Room} from "../../Models/Room";
import {DataService} from "../../data.service";
import {User} from "../../Models/User";
import {ActivatedRoute, Router} from "@angular/router";

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

  constructor(private dataService:DataService,
              private route:ActivatedRoute,
              private router:Router) {
  }

  ngOnInit(): void {
    this.dataService.getRooms().subscribe(
      next=>{
        this.rooms=next;
      }
    )
    this.dataService.getUsers().subscribe(
      next=>{
        this.users=next;
      }
    )
    const id=this.route.snapshot.queryParams['id'];
    console.log('route id is ',id);
    if(id){
    this.dataService.getBooking(+id).subscribe(
      next=>{
        this.booking=next;
      }
    )
    console.log('editbook component',this.booking);
  }
    else {
      this.booking=new Booking();
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
