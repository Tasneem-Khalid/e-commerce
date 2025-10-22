import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SpecificProductService {
private readonly http= inject(HttpClient)

getSpecificProduct(productId:string|null):Observable<any>{

  return this.http.get(environment.baseUrl +  `products/${productId}`)
}
}
