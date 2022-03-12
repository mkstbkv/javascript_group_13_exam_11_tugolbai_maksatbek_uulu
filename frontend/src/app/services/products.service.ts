import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product, ProductData } from '../models/product.model';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Product[]>(environment.apiUrl + '/products').pipe(
      map(response => {
        return response.map(productData => {
          return new Product(
            productData._id,
            productData.category,
            productData.user,
            productData.title,
            productData.description,
            productData.price,
            productData.image,
          );
        });
      })
    );
  }
  getProduct(id: string) {
    return this.http.get<Product>(environment.apiUrl + '/products/' + id).pipe(
      map(response => {
        return response;
      })
    );
  }

  createProduct(productData: ProductData, token: string) {
    const formData = new FormData();

    Object.keys(productData).forEach(key => {
      if (productData[key] !== null) {
        formData.append(key, productData[key]);
      }
    });

    return this.http.post(environment.apiUrl + '/products', formData, {
      headers: new HttpHeaders({'Authorization': token}),
    });
  }

  deleteProduct(id: string, token: string) {
    return this.http.delete(environment.apiUrl + '/products/' + id, {
      headers: new HttpHeaders({'Authorization': token}),
    });
  }
}
