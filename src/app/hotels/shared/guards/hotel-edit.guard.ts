import { CanDeactivateFn } from '@angular/router';
import { HotelEditComponent } from '../../hotel-edit/hotel-edit.component';

export const hotelEditGuard: CanDeactivateFn<HotelEditComponent> = (component, currentRoute, currentState, nextState) => {
  if(component.hotelForm.dirty){
    const hotelName = component.hotelForm.get('hotelName')?.value || 'Nouveau hotel';
    return confirm(`Voulez-vous annuler les changemetns effectués sur ${hotelName}`)
  }
  return true;
};
