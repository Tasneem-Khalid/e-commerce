import { Component, inject, OnInit } from '@angular/core';
import { AllProductsService } from '../../core/services/all-products/all-products-service';
import { IProduct } from '../../core/interfaces/iproduct';
import { FlowbiteService } from '../../core/services/flowbite';
import { initFlowbite } from 'flowbite';
import { CategoriesCarousel } from "./categories-carousel/categories-carousel";
import { MainCarousel } from "./main-carousel/main-carousel";
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/add-to-cart/cart-service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-home',
  imports: [CategoriesCarousel, MainCarousel, RouterLink, CurrencyPipe],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit{

constructor(private readonly flowbiteService: FlowbiteService) {}

  private readonly allProductsService = inject(AllProductsService)
  productList:IProduct[]= [];
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    this.allProductsData();
  }

  allProductsData():void{
    this.allProductsService.getAllProducts().subscribe({
      next:(res) =>{

        this.productList = res.data

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

}
