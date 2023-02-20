import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {Booking} from "../Models/Booking";
import {ActivatedRoute, Router} from "@angular/router";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit{
  // @ts-ignore
  selectedDate:string;
  // @ts-ignore
  bookings:Array<Booking>;
  dataLoaded=false;
  message='';
  constructor(private dataService:DataService,
              private router:Router,
              private route:ActivatedRoute
  ) {
  }
  loadData(){
    this.message='data loading..';
    this.route.queryParams.subscribe(
      params=>{
        this.selectedDate=params['date'];
        if(!this.selectedDate){
          this.selectedDate=formatDate(new Date(),'yyyy-MM-dd','en-GB');
        }

        this.dataService.getBookings(this.selectedDate).subscribe(
          next=>{
            this.bookings=next;
            this.dataLoaded=true;
            this.message='';
          }, error=>{
            this.message='some error occurred';
          }
        )
      }
    )

  }
  // @ts-ignore
  ngOnInit(): void {
this.loadData();
  }

  editBooking(id:number){
    this.router.navigate(['editBooking'],{queryParams:{id}});
  }
  newBooking(){
    this.router.navigate(['addBooking']);
  }
  cancelBooking(id:number){
    this.message='deleting booking please wait..'
    this.dataService.deleteBooking(id).subscribe(
      next=>{
        this.message='';
        this.loadData();
      },error=>{
        this.message='some error occurred';
      }
    );
  }
dateChanged(){
    this.router.navigate([''],{queryParams:{date:this.selectedDate}});
}
}
