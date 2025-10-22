import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {

  const cookies= inject(CookieService)

  if(cookies.check('userToken')){
    req = req.clone(
      {
        setHeaders:{
          token:cookies.get('userToken')
        }
      }
    )
  }
  return next(req);
};
