import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService)
  if(authenticationService.isLoggedIn$.value){
    return true;
  }else{
    return false;
  }
  
};
