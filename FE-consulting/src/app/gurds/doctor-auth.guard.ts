import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

export const doctorAuthGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService)
  if(authenticationService.isDoctorLoggedIn$.value){
    return true;
  }else{
    return false;
  }
};
