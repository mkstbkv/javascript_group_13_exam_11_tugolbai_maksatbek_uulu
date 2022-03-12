import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import {
  createProductFailure,
  createProductRequest, createProductSuccess, deleteProductFailure, deleteProductRequest, deleteProductSuccess,
  fetchProductFailure, fetchProductRequest,
  fetchProductsFailure,
  fetchProductsRequest,
  fetchProductsSuccess, fetchProductSuccess
} from './products.actions';
import { HelpersService } from '../services/helpers.service';

@Injectable()
export class ProductsEffects {
  fetchProducts = createEffect(() => this.actions.pipe(
    ofType(fetchProductsRequest),
    mergeMap(({id}) => this.productsService.getProducts(id).pipe(
      map(products => fetchProductsSuccess({products})),
      catchError(() => of(fetchProductsFailure({
        error: 'Something went wrong'
      })))
    ))
  ));

  fetchProduct = createEffect(() => this.actions.pipe(
    ofType(fetchProductRequest),
    mergeMap( ({id}) => this.productsService.getProduct(id).pipe(
      map(product => fetchProductSuccess({product})),
      catchError(() => of(fetchProductFailure({
        error: 'Something went wrong'
      })))
    ))
  ));

  createProduct = createEffect(() => this.actions.pipe(
    ofType(createProductRequest),
    mergeMap(({productData, token}) => this.productsService.createProduct(productData, token).pipe(
      map(() => createProductSuccess()),
      tap(() => {
        this.helpers.openSnackbar('Product created successful');
        void this.router.navigate(['/']);
      }),
      this.helpers.catchServerError(createProductFailure)
    ))
  ));

  deleteProduct = createEffect(() => this.actions.pipe(
    ofType(deleteProductRequest),
    mergeMap(({id, token}) => this.productsService.deleteProduct(id, token).pipe(
      map(() => deleteProductSuccess()),
      tap(() => {
        this.helpers.openSnackbar('Product deleted successful');
        void this.router.navigate(['/']);
      }),
      this.helpers.catchServerError(deleteProductFailure)
    ))
  ));

  constructor(
    private actions: Actions,
    private productsService: ProductsService,
    private router: Router,
    private helpers: HelpersService,
  ) {}
}
