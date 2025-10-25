import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpecificProductService } from '../../core/services/specific-product/specific-product-service';
import { IProduct } from '../../core/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/add-to-cart/cart-service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-details',
  imports: [CarouselModule, CurrencyPipe],
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class Details implements OnInit{

  private readonly activatedRoute= inject(ActivatedRoute)
  private readonly specificProduct= inject(SpecificProductService)
  productId:string | null = null

  productDetails: IProduct = {} as IProduct

  ngOnInit(): void {
    this.getURLParams()
    this.getSpecificProductData()
  }


  getURLParams():void{

    this.activatedRoute.paramMap.subscribe(
      {
        next: (params)=> {
          this.productId= params.get('id')
        }
      }
    )
  }

  getSpecificProductData():void{

    this.specificProduct.getSpecificProduct(this.productId).subscribe({
      next:(res)=>{
        this.productDetails= res.data

      }
    })
  }

      private readonly toastr= inject(ToastrService)

      private readonly cartService = inject(CartService)
      addProductToCart(productId:string):void{
        this.cartService.addToCart(productId).subscribe({

          next:(res)=>{

          if(res.status === 'success'){
            this.toastr.success(res.message, 'CyperMarket')
          }

          }
            })
  
      }

  // owl carousel

  productImagesSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-chevron-left text-blue-900"></i>', '<i class="fa-solid fa-chevron-right text-blue-900"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items:1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }




}
