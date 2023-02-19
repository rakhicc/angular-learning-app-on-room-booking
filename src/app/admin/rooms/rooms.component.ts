import {Component, OnInit} from '@angular/core';
import {DataService} from "../../data.service";
import {Room} from "../../Models/Room";
import {ActivatedRoute, Router} from "@angular/router";
import {FormResetService} from "../../form-reset.service";

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit{
  rooms!:Array<Room>;
  selectedRoom!: Room ;
  // @ts-ignore
  action:string;
  // @ts-ignore
  loadingData=true;
  message='Please wait getting list of rooms';
  loadAttempts=0;
  constructor(private dataService:DataService,
              private route:ActivatedRoute,
              private router:Router,
              private formResetService:FormResetService) {
  }
  loadData(){
    this.dataService.getRooms().subscribe(
      (next)=>{
        this.rooms=next;
        // @ts-ignore
        this.loadingData=false;
        this.processUrlParams();
      },
      (error)=>{
        console.log('error',error);
        console.log(this.loadingData);
        if(error.status===402){
          this.message='sorry you need to pay to use the application';
        }
        else {
          this.loadAttempts++;
          if(this.loadAttempts <=10){
            this.message='sorry Please wait trying again...';
            this.loadData();
          } else {
            this.message='Sorry some error occurred Please contact support';
          }

        }

      }
    );
  }
  processUrlParams(){
    this.route.queryParams.subscribe(
      (params) =>{
        // @ts-ignore
        this.action=null;
        const id=params['id'];
        if(id){
          // @ts-ignore
          this.selectedRoom=this.rooms.find(roomExist=>{
            return roomExist.id===+id;
          });
          this.action=params['action'];
          console.log('selectedroom',this.selectedRoom);
        }
        if(params['action']==='add'){
          this.selectedRoom=new Room();
          this.action='edit';
          this.formResetService.resetRoomFormEvent.emit(this.selectedRoom);
        }
      }
    )
  }
  ngOnInit() {
this.loadData();
  }
  setRoom(id:number){
    console.log('id',id);
this.router.navigate(['admin','rooms'],{queryParams:{id:id,action:'view'}});

  }
  addRoom(){
    this.router.navigate(['admin','rooms'],{queryParams:{action:'add'}});
  }


}
