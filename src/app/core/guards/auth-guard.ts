import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {

const cookies = inject(CookieService)
const router = inject(Router)

if(cookies.get('userToken')){

  return true
}
else{

  return router.parseUrl('/login')
}

};
