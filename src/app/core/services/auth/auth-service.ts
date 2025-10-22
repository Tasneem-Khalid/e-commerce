import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http= inject(HttpClient)
  private readonly cookies= inject(CookieService)
  private readonly router= inject(Router)

  register(userData:object):Observable<any>{

    return this.http.post(environment.baseUrl + 'auth/signup',userData)
  }
  login(userData:object):Observable<any>{

    return this.http.post(environment.baseUrl + 'auth/signin',userData)
  }

  signOut():void{

    this.cookies.delete('userToken')

    this.router.navigate(['/login'])

  }

  decodeToken(){
    let token;
    try {
      token = jwtDecode(this.cookies.get('userToken'))
    } catch (error:unknown) {

      if (error instanceof Error) {
        console.error(error.message)
      }
      this.signOut()

    }

    return token
  }

  verifyUserEmail(userEmail:object):Observable<any>{

    return this.http.post(environment.baseUrl + `auth/forgotPasswords`,userEmail )
  }

  verifyOTP(resetCode:object):Observable<any>{

    return this.http.post(environment.baseUrl + `auth/verifyResetCode`, resetCode)
  }

  resetUserPassword(newPassword:object):Observable<any>{

    return this.http.put(environment.baseUrl + `auth/resetPassword`, newPassword)
  }


}
