import { Component, inject, OnInit } from '@angular/core';
import { AllCategoriesService } from '../../core/services/all-categories/all-categories-service';
import { ICategory } from '../../core/interfaces/icategory';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.html',
  styleUrl: './categories.css'
})
export class Categories implements OnInit{

  private readonly allCategories = inject(AllCategoriesService)
  storeCategories:ICategory[] = []

  ngOnInit(): void {
    this.availableCategories()
  }

  availableCategories()
  {

    this.allCategories.getAllCategories().subscribe({

      next:(res)=>{

        this.storeCategories = res.data
        
      }
    })
  }

}
