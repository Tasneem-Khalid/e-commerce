import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { env } from 'process';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly http = inject(HttpClient)
  private readonly cookies = inject(CookieService)



  addToCart(id:string):Observable<any>{

    return this.http.post(environment.baseUrl+'cart',{productId: id})
  }

  loggedUserCart():Observable<any>{

    return this.http.get(environment.baseUrl + 'cart' )
  }

  removeCartItem(itemId:string):Observable<any>{

    return this.http.delete(environment.baseUrl + `cart/${itemId}`)
  }

  updateCartItemCount(itemId:string, count:number):Observable<any>{

    return this.http.put(environment.baseUrl+ `cart/${itemId}`, {"count":count})
  }

  clearCart():Observable<any>{

    return this.http.delete(environment.baseUrl + 'cart')
  }

  checkoutSession(cartId:string|null, checkoutForm:object):Observable<any>{
    return this.http.post(environment.baseUrl + `orders/checkout-session/${cartId}?url=https://e-commerce-gold-eight-21.vercel.app/`, checkoutForm)
  }

  cashOrder(cartId:string|null, checkoutForm:object):Observable<any>{

        return this.http.post(environment.baseUrl + `orders/${cartId}`, checkoutForm)

  }

  getUserOrders(userId:string):Observable<any>{

    return this.http.get(environment.baseUrl + `orders/user/${userId}`)
  }
}
