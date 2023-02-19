export class Room{
  // @ts-ignore
  id: number;
  name!:string;
  location!:string;
  capacities=new Array<LayoutCapacity>();

  static fromHttp(room:Room):Room{
    const newRoom=new Room();
    newRoom.id=room.id;
    newRoom.name=room.name;
    newRoom.location=room.location;
    const capacities=new Array<LayoutCapacity>();
    for(const item of room.capacities){
      capacities.push(LayoutCapacity.fromHttp(item));
    }
    newRoom.capacities=capacities;
    return newRoom;
  }
}

export enum Layout {
  THEATER='Theater',
  USHAPE='U-Shape',
  BOARD='Board Meeting'
}

export class LayoutCapacity{
layout!:Layout;
capacity!:number;
static fromHttp(lc:LayoutCapacity):LayoutCapacity{
  const newlc=new LayoutCapacity();
  newlc.capacity=lc.capacity;
  // @ts-ignore
  newlc.layout=Layout[lc.layout];
  return newlc;
}
}
