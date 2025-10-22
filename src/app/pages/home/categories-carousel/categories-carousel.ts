import { Component, inject, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { AllCategoriesService } from '../../../core/services/all-categories/all-categories-service';
import { ICategory } from '../../../core/interfaces/icategory';


@Component({
  selector: 'app-categories-carousel',
  imports: [CarouselModule],
  templateUrl: './categories-carousel.html',
  styleUrl: './categories-carousel.css'
})
export class CategoriesCarousel implements OnInit{
  private readonly allCategoriesService = inject(AllCategoriesService)

  categoryList:ICategory[]= []

  categoriesSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout: 4000,
    autoplayHoverPause:true,
    margin: 10,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-arrow-left text-blue-700 "></i>', '<i class="fa-solid fa-arrow-right text-blue-700 "></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      },
      1200: {
        items: 5
      }
    },
    nav: true
  }

  allCategoriesData():void{

    this.allCategoriesService.getAllCategories().subscribe({

      next: (res)=>{
        console.log('categories',res);
        this.categoryList = res.data

      },
      error: (err)=>{
        console.log(err);

      }
    })

  }

  ngOnInit(): void {

    this.allCategoriesData()
  }


}
