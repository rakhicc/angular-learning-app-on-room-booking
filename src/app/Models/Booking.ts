import {Layout, Room} from "./Room";
import {User} from "./User";

export class Booking {
  // @ts-ignore
  id: number;
  // @ts-ignore
  room: Room;
  // @ts-ignore
  user: User;
  // @ts-ignore
  layout: Layout;
  // @ts-ignore
  title: string;
  // @ts-ignore
  date: string;
  // @ts-ignore
  startTime: string;
  // @ts-ignore
  endTime: string;
  // @ts-ignore
  participants: number;

  getDateAsDate() {
    return new Date(this.date);
  }
  static fromHttp(booking:Booking){
    const newBooking=new Booking();
    newBooking.id=booking.id;
    newBooking.participants=booking.participants;
    newBooking.title=booking.title;
    newBooking.date=booking.date;
    newBooking.startTime=booking.startTime;
    newBooking.endTime=booking.endTime;
    // @ts-ignore
    newBooking.layout=Layout[booking.layout];
    newBooking.room=Room.fromHttp(booking.room);
    newBooking.user=User.fromHttp(booking.user);
    return newBooking;

  }
}
