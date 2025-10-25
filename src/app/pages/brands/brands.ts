import { Component, inject, OnInit } from '@angular/core';
import { AllBrandsService } from '../../core/services/brands/all-brands-service';
import { IBrands } from '../../core/interfaces/ibrands';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.html',
  styleUrl: './brands.css'
})
export class Brands implements OnInit{

  private readonly allBrandsService = inject(AllBrandsService)

  allBrandsList:IBrands[]= []


  ngOnInit(): void {
    this.getAllBrands();
  }

  getAllBrands(){

    this.allBrandsService.allBrands().subscribe({
      next:(res)=> {

        this.allBrandsList = res.data
        
      }
    })
  }
}
