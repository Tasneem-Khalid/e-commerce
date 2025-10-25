import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/add-to-cart/cart-service';
import { IUserCart } from '../../core/interfaces/iuser-cart';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit{

  private readonly cartService= inject(CartService)
  private readonly toastr = inject(ToastrService)
  userCartDetails:IUserCart= {} as IUserCart

  ngOnInit(): void {
    this.getLoggedUserCart()
  }


  getLoggedUserCart():void{

    this.cartService.loggedUserCart().subscribe({

      next: (res)=>{
        this.userCartDetails = res.data

      }
    })
  }

  removeCartItem(itemId:string, itemName:string):void{

    this.cartService.removeCartItem(itemId).subscribe({

      next:(res)=>{
        this.userCartDetails = res.data
        if(res.status=== 'success'){

          this.toastr.success(`${itemName} has been removed successfully from your cart`, 'CyperMarket')
        }
      }
    })
  }

  updateItemCount(itemId:string, count:number):void{

    this.cartService.updateCartItemCount(itemId,count).subscribe({

      next:(res)=>{
        this.userCartDetails= res.data
      }
    })
  }

  clearUserCart():void{

    this.cartService.clearCart().subscribe({

      next:(res)=>{
        this.getLoggedUserCart()
        this.toastr.success("Your cart has been cleared", "CyperMarket")
      }

    })
  }
}
