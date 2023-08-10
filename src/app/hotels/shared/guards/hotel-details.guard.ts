import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';



export const hotelDetailsGuard: CanActivateFn = (route, state) => {

  const id = +route.url[1].path;

  if(isNaN(id) || id <= 0){
    alert('hotel unknown');
    const router: Router = inject(Router);
    router.navigate(['/hotels']);
    return false;
  }
  return true;
};
