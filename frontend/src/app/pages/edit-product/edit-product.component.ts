import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { ProductData } from '../../models/product.model';
import { createProductRequest } from '../../store/products.actions';
import { Category } from '../../models/category.model';
import { fetchCategoriesRequest } from '../../store/categories.actions';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.sass']
})
export class EditProductComponent implements OnInit, OnDestroy {
  @ViewChild('f') form!: NgForm;
  loading: Observable<boolean>;
  error: Observable<string | null>;
  user: Observable<null | User>;
  userSub!: Subscription;
  categories: Observable<Category[]>

  token!: string;

  constructor(
    private store: Store<AppState>
  ) {
    this.categories = store.select(state => state.categories.categories);
    this.loading = store.select(state => state.products.createLoading);
    this.error = store.select(state => state.products.createError);
    this.user = store.select(state => state.users.user);
  }

  ngOnInit(): void {
    this.userSub = this.user.subscribe(user => {
      if (user) {
        this.token = user.token;
      } else {
        this.token = '';
      }
    });
    this.store.dispatch(fetchCategoriesRequest());
  }

  onSubmit() {
    const productData: ProductData = this.form.value;
    const token = this.token
    this.store.dispatch(createProductRequest({productData, token}));
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
