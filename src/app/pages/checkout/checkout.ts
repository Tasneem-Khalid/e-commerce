import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../core/services/add-to-cart/cart-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout implements OnInit{
  activatedRoute= inject(ActivatedRoute)
  private readonly router = inject(Router)
  private readonly toastr = inject(ToastrService)
  cartId:string|null=null
  paymentMethod:string= ''
  setPaymentMethod(method:string){
    this.paymentMethod=method
  }

  checkoutForm!:FormGroup

  ngOnInit(): void {
    this.initiateForm();
    this.getCartId()
  }

  initiateForm():void{

    this.checkoutForm= new FormGroup({

      shippingAddress: new FormGroup({
        details: new FormControl('', [Validators.required]),
        phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0125]\d{8}$/)]),
        city: new FormControl('', [Validators.required]),

  })
    }
      )
  }

  getCartId(){
    this.activatedRoute.paramMap.subscribe({

      next: (urlParams)=>{
        this.cartId=urlParams.get('cartId')
      }
    })
  }

  private readonly cartservice = inject(CartService)
  submitCheckOut(){

    if(this.checkoutForm.valid){


      
      if(this.paymentMethod=== 'visa'){

        this.cartservice.checkoutSession(this.cartId, this.checkoutForm.value).subscribe({
  
          next:(res)=>{
            if(res.status==='success'){
              window.open(res.session.url,'_self')
            }
          }
        })
      }

      if(this.paymentMethod=== 'cod'){
        this.cartservice.cashOrder(this.cartId, this.checkoutForm.value).subscribe({

          next:(res)=>{

            if (res.status === 'success') {
              this.router.navigate(['/cod'] );
              this.toastr.success('Your Order Has Been Placed Successfully', 'CyperMarket')
            }
          }
        })
      }
      
    }
  }




}
