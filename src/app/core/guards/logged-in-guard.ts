import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const loggedInGuard: CanActivateFn = (route, state) => {

  
  const cookies = inject(CookieService)
  const router = inject(Router)

  if(cookies.get('userToken')){

    return router.parseUrl('/home')
  }else{

    return true;
  }


};
