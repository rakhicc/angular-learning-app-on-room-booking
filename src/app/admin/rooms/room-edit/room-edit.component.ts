import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Layout, LayoutCapacity, Room} from "../../../Models/Room";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../../../data.service";
import {Router} from "@angular/router";
import {FormResetService} from "../../../form-reset.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css']
})
export class RoomEditComponent implements OnInit,OnDestroy{
 // @ts-ignore

  @Input()
  // @ts-ignore
  room:Room;
  layouts=Object.keys(Layout);

  layoutEnum= Layout;
  // @ts-ignore
  roomForm:FormGroup;
  // @ts-ignore
  resetEventSubscription:Subscription;
  @Output()
  changedataEvent=new EventEmitter();

 constructor(private formBuilder:FormBuilder,private dataService:DataService,
             private router:Router,
             private formResetService:FormResetService) {
 }
 // @ts-ignore
  ngOnInit() {
   this.initialiseForm();
   // @ts-ignore
    this.resetEventSubscription=this.formResetService.resetRoomFormEvent.subscribe(
     (room)=>{
       this.room=room;
       this.initialiseForm();
     }

   )
  }
  initialiseForm(){
    console.log('layoutenum',this.layoutEnum);
// @ts-ignore

    this.roomForm=this.formBuilder.group(
      {
        roomName:[this.room.name,Validators.required],
        location: [this.room.location,[Validators.required,Validators.minLength(3)]]
      }
    )

    for(const layout of this.layouts){
      const layoutCapacity=this.room.capacities.find(lc=>{
        // @ts-ignore
        return lc.layout===Layout[layout];
      })
      const initialCapacity=layoutCapacity==null?0:layoutCapacity.capacity;
      // @ts-ignore
      this.roomForm.addControl(`layout${layout}`,this.formBuilder.control(initialCapacity));
    }
  }
onSubmit(){
// @ts-ignore
  this.room.name=this.roomForm.controls['roomName'].value;
  // @ts-ignore
  this.room.location=this.roomForm.controls['location'].value;
  this.room.capacities=new Array<LayoutCapacity>();
  for(const layout of this.layouts){
    const layoutCapacity=new LayoutCapacity();
    // @ts-ignore
    layoutCapacity.layout=Layout[layout];
    // @ts-ignore
    layoutCapacity.capacity=this.roomForm.controls[`layout${layout}`].value;
    this.room.capacities.push(layoutCapacity);
  }
  console.log('room',this.room);
  if(this.room.id==null){
    this.dataService.addRoom(this.room).subscribe(
      next=>{
        this.changedataEvent.emit();
        this.router.navigate(['admin','rooms'],{queryParams:{action:'view',id:next.id}});
      }
    )
  } else {
    this.dataService.updateRoom(this.room).subscribe(
      next=>{
        this.changedataEvent.emit();
        this.router.navigate(['admin','rooms'],{queryParams:{action:'view',id:next.id}});
      }
    )
  }
}

  ngOnDestroy(): void {
   this.resetEventSubscription.unsubscribe();
  }
}
