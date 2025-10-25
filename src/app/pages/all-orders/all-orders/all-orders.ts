import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/add-to-cart/cart-service';
import { AuthService } from '../../../core/services/auth/auth-service';
import { IOrder } from '../../../core/interfaces/iorder';

@Component({
  selector: 'app-all-orders',
  imports: [],
  templateUrl: './all-orders.html',
  styleUrl: './all-orders.css'
})
export class AllOrders implements OnInit{

  private readonly cartService = inject(CartService)
  private readonly authService = inject(AuthService)
  decodedToken:any
  userId:string = ''
  userOrders:IOrder[] = [] 

  ngOnInit(): void {
    this.getUserId()
    this.getAllUserOrders()
  }

  getUserId(){

    this.decodedToken = this.authService.decodeToken();
    this.userId = this.decodedToken?.id
  }

  getAllUserOrders(){
    this.cartService.getUserOrders(this.userId).subscribe({

      next:(res)=>{

        this.userOrders= res
      }
    })
  }
}
