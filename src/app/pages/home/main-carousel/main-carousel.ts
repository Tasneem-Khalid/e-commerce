import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-main-carousel',
  imports: [CarouselModule],
  templateUrl: './main-carousel.html',
  styleUrl: './main-carousel.css'
})
export class MainCarousel {

  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay:true,
    autoplayTimeout: 2500,
    autoplayHoverPause:true,
    dots: true,
    navSpeed: 700,
    items:1,
  }

}
