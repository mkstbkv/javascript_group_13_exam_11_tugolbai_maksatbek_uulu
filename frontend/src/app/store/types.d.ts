import { LoginError, RegisterError, User } from '../models/user.model';
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';

export type CategoriesState = {
  categories: Category[],
  fetchLoading: boolean,
  fetchError: null | string,
};

export type ProductsState = {
  products: Product[],
  product: null | Product,
  fetchLoading: boolean,
  fetchError: null | string,
  createLoading: boolean,
  createError: null | string,
  deleteLoading: boolean,
  deleteError: null | string,
};

export type UsersState = {
  user: null | User,
  registerLoading: boolean,
  registerError: null | RegisterError,
  loginLoading: boolean,
  loginError: null | LoginError,
}

export type AppState = {
  categories: CategoriesState,
  products: ProductsState,
  users: UsersState,
}
