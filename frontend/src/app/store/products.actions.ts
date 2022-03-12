import { createAction, props } from '@ngrx/store';
import { Product, ProductData } from '../models/product.model';

export const fetchProductsRequest = createAction('[Products] Fetch Request');
export const fetchProductsSuccess = createAction(
  '[Products] Fetch Success',
  props<{products: Product[]}>()
);
export const fetchProductsFailure = createAction(
  '[Products] Fetch Failure',
  props<{error: string}>()
);



export const fetchProductRequest = createAction(
  '[Products] One Product Fetch Request',
  props<{id: string}>()
);
export const fetchProductSuccess = createAction(
  '[Products] One Product Fetch Success',
  props<{product: Product}>()
);
export const fetchProductFailure = createAction(
  '[Products] One Product Fetch Failure',
  props<{error: string}>()
);



export const createProductRequest = createAction(
  '[Products] Create Request',
  props<{productData: ProductData, token: string}>()
);
export const createProductSuccess = createAction(
  '[Products] Create Success'
);
export const createProductFailure = createAction(
  '[Products] Create Failure',
  props<{error: string}>()
);




export const deleteProductRequest = createAction(
  '[Products] Delete Request',
  props<{id: string, token: string}>()
);
export const deleteProductSuccess = createAction(
  '[Products] Delete Success'
);
export const deleteProductFailure = createAction(
  '[Products] Delete Failure',
  props<{error: string}>()
);
