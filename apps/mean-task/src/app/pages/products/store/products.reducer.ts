import { createReducer, on } from '@ngrx/store';
import { initialState } from './products.state';
import * as ProductsActions from './products.actions';

export const productsReducer = createReducer(
  initialState,

  // Load products
  on(ProductsActions.loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ProductsActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    loading: false,
    items: products,
  })),

  on(ProductsActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Add product
  on(ProductsActions.addProductSuccess, (state, { product }) => ({
    ...state,
    items: [...state.items, product],
  })),

  on(ProductsActions.addProductFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
