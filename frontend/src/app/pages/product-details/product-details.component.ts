import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { Product } from '../../models/product.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { ActivatedRoute } from '@angular/router';
import { deleteProductRequest, fetchProductRequest } from '../../store/products.actions';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.sass']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  loading: Observable<boolean>;
  error: Observable<string | null>;
  user: Observable<null | User>;
  userSub!: Subscription;
  productSub!: Subscription;
  product: Observable<null | Product>;
  token!: string;
  productOne!: Product | null;
  userOne!: User | null;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {
    this.loading = store.select(state => state.products.fetchLoading);
    this.error = store.select(state => state.products.fetchError);
    this.user = store.select(state => state.users.user);
    this.product = store.select(state => state.products.product);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchProductRequest({id: this.route.snapshot.params['id']}));

    this.userSub = this.user.subscribe(user => {
      if (user) {
        this.userOne = user;
        this.token = user.token
      } else {
        this.userOne = null;
      }
    });

    this.productSub = this.product.subscribe(prod => {
      if (prod) {
        this.productOne = prod;
      } else {
        this.productOne = null;
      }
    });

  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  deleteProduct(id: string) {
    const token = this.token
    this.store.dispatch(deleteProductRequest({id, token}));
  }
}
