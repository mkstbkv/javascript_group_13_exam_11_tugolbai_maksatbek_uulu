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
      tap(() => this.router.navigate(['/'])),
      catchError(() => of(createProductFailure({error: 'Wrong data'})))
    ))
  ));

  deleteProduct = createEffect(() => this.actions.pipe(
    ofType(deleteProductRequest),
    mergeMap(({id, token}) => this.productsService.deleteProduct(id, token).pipe(
      map(() => deleteProductSuccess()),
      tap(() => this.router.navigate(['/'])),
      catchError(() => of(deleteProductFailure({error: 'Wrong data'})))
    ))
  ));

  constructor(
    private actions: Actions,
    private productsService: ProductsService,
    private router: Router
  ) {}
}
