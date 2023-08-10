import { Component, OnInit } from "@angular/core";
import { IHotel } from "../shared/models/hotel";
import { HotelListService } from "../shared/services/hotel-list.service";

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: [ './hotel-list.component.css' ]
})

export class HotelListComponent implements OnInit{

  public title = 'Liste hotels';
  public showBadge: boolean = true;
  public _hotelFilter = '';

  public filteredHotels : IHotel[] = [];

  public myReceivedRating : string = '';


  public hotels: IHotel[] = [];

  public errMsg: string = '';

  constructor(private hotelListService: HotelListService ){

  };

  public toggleNewBadge(): void {
    this.showBadge = !this.showBadge;
  }

  ngOnInit(): void {
    this.hotelListService.getHotels().subscribe({
      next: hotels => {
        this.hotels = hotels;
        this.filteredHotels = this.hotels;
      },
      error: err => this.errMsg = err
    });

  }

  public get hotelFilter(): string {
    return this._hotelFilter;
  }

  public set hotelFilter(filter : string){
    this._hotelFilter = filter;

    this.filteredHotels = this.hotelFilter ? this.filterHotels(this._hotelFilter) : this.hotels;
  }

  private filterHotels(criteria: string) : IHotel[]{
    criteria = criteria.toLowerCase();

    const res =  this.hotels.filter(
      (hotel : IHotel) => hotel.hotelName.toLowerCase().indexOf(criteria) != -1
    );

    return res;
  }

  receivedRating(message: string) : void {
    this.myReceivedRating = message;
  }
}
