import { Component, inject, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { IProduct } from '../../core/interfaces/iproduct';
import { AllProductsService } from '../../core/services/all-products/all-products-service';
import { FlowbiteService } from '../../core/services/flowbite';
import { RouterLink } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { CartService } from '../../core/services/add-to-cart/cart-service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-products',
  imports: [RouterLink, NgxPaginationModule, FormsModule, SearchPipe, CurrencyPipe],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit{
  searchTerm:string=''

constructor(private readonly flowbiteService: FlowbiteService) {}

  private readonly allProductsService = inject(AllProductsService)
  productList:IProduct[]= [];
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    this.allProductsData();
  }

  pageSize!:number
  p!:number
  total!:number

  allProductsData(pageNum:number = 1):void{
    this.allProductsService.getAllProducts(pageNum).subscribe({
      next:(res) =>{
        console.log( 'products', res);

        this.productList = res.data
        this.pageSize = res.metadata.limit
        this.p = res.metadata.currentPage
        this.total= res.results


      },
      error:(err)=> {
        console.log(err);

      }
    })

    
  }

  private readonly toastr= inject(ToastrService)

  private readonly cartService = inject(CartService)

  addProductToCart(productId:string):void{
    this.cartService.addToCart(productId).subscribe({

      next:(res)=>{

        console.log('add to cart',res);
          if(res.status === 'success'){
            this.toastr.success(res.message, 'CyperMarket')
          }

      },
      error: (err)=>{
        console.log('cart err', err);
      }
        })

  }


}

