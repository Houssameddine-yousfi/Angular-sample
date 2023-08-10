import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { hotelDetailsGuard } from './shared/guards/hotel-details.guard';
import { HotelEditComponent } from './hotel-edit/hotel-edit.component';
import { hotelEditGuard } from './shared/guards/hotel-edit.guard';



@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'hotels', component: HotelListComponent},
      {
        path: 'hotels/:id/edit',
        component: HotelEditComponent,
        canDeactivate: [hotelEditGuard]
      },
      {
        path: 'hotels/:id',
        component: HotelDetailComponent,
        canActivate: [hotelDetailsGuard]
      },
    ]),
  ],
  exports: [
    RouterModule
  ]
})
export class HotelRoutingModule { }
