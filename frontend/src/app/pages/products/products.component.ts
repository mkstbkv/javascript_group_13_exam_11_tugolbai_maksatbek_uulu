import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { fetchProductsRequest } from '../../store/products.actions';
import { Category } from '../../models/category.model';
import { fetchCategoriesRequest } from '../../store/categories.actions';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent  {
  products: Observable<Product[]>
  categories: Observable<Category[]>
  loading: Observable<boolean>
  error: Observable<null | string>
  title = 'All Products'

  constructor(private store: Store<AppState>) {
    this.products = store.select(state => state.products.products);
    this.categories = store.select(state => state.categories.categories);
    this.loading = store.select(state => state.products.fetchLoading);
    this.error = store.select(state => state.products.fetchError);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchProductsRequest({id: ''}));
    this.store.dispatch(fetchCategoriesRequest());
  }

  getCategory(id: string, title: string) {
    this.store.dispatch(fetchProductsRequest({id: id}));
    this.title = title
  }

}
