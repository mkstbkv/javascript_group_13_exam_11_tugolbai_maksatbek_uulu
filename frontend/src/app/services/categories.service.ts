import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private http: HttpClient) { }

  getComments() {
    return this.http.get<Category[]>(environment.apiUrl + '/categories').pipe(
      map(response => {
        return response.map(categoryData => {
          return new Category(categoryData._id, categoryData.title);
        });
      })
    );
  }
}
