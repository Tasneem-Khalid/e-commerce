import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllCategoriesService {
  private readonly http = inject(HttpClient)

  getAllCategories():Observable<any>{

    return this.http.get(environment.baseUrl + 'categories')
  }
}
