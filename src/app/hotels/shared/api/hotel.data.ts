import { InMemoryDbService, RequestInfo } from "angular-in-memory-web-api";
import { Observable } from "rxjs";
import { IHotel } from "../models/hotel";


export class HotelData implements InMemoryDbService {
  constructor() {

  }

  createDb(): Record<string, IHotel[]> {
    const hotels: IHotel[] = [
      {
        id: 1,
        hotelName: 'Buea sweet life',
        description: 'Belle vue au bord de la mer',
        price: 230.5,
        imageUrl: 'assets/img/hotel-room.jpg',
        rating: 3.5,
        tags: ['nouveau']
      },
      {
        id: 2,
        hotelName: 'Marakech',
        description: 'Profitez de la vue sur les montagnes',
        price: 145.5,
        imageUrl: 'assets/img/the-interior.jpg',
        rating: 5,
      },
      {
        id: 3,
        hotelName: 'Abudja new look palace',
        description: 'Séjour complet avec service de voitures',
        price: 120.12,
        imageUrl: 'assets/img/indoors.jpg',
        rating: 4,
        tags: ['nouveau']
      },
      {
        id: 4,
        hotelName: 'Cape town city',
        description: 'Magnifique cadre pour votre séjour',
        price: 135.12,
        imageUrl: 'assets/img/window.jpg',
        rating: 2.5,
        tags: ['nouveau']
      }
    ];
    return { hotels };
  }

  public genId(hotels: IHotel[]): number {

    var hotels_idss: number[] = hotels
      .map(hotel => hotel.id)
      .filter(id => id !== null) as number[];

    return hotels_idss.length>0?Math.max(...hotels_idss) +1 : 1;
  }
}
