import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelListService } from '../shared/services/hotel-list.service';
import { IHotel } from '../shared/models/hotel';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css']
})
export class HotelDetailComponent implements OnInit {

  public hotel: IHotel | undefined = <IHotel>{};

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelListService,
    private router: Router
  ){}


  ngOnInit(): void {
    const idstr: string|null = this.route.snapshot.paramMap.get('id');
    const id: number =  !!idstr? +idstr : 0;
    console.log('id: ', id)


    //get details of one hotel
    this.hotelService.getHotels().subscribe((hotels: IHotel[]) => {
      this.hotel = hotels.find(hotel => hotel.id === id);
      console.log('hotel' + this.hotel?.hotelName)
    });
  }

  public backToList(): void {
    this.router.navigate(['/hotels']);
  }


}
