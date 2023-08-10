export interface IHotel {
  id : number|null;
  hotelName : string;
  description: string;
  price: number;
  imageUrl: string;
  rating: number;
  tags? : string[];
}


export class Hotel implements IHotel {
  constructor(
    public id : number|null,
    public hotelName : string,
    public description: string,
    public price: number,
    public imageUrl: string,
    public rating: number,
    public tags? : string[]
  ){}
}
