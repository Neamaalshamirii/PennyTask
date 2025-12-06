import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './products.state';

// Feature key must match reducer registration
export const selectProductsState =
  createFeatureSelector<ProductsState>('products');

// Always return an array - NEVER unknown
export const selectProducts = createSelector(
  selectProductsState,
  (state): any[] => {
    return Array.isArray(state?.items) ? state.items : [];
  }
);

export const selectProductsLoading = createSelector(
  selectProductsState,
  (state): boolean => !!state?.loading
);

export const selectProductsError = createSelector(
  selectProductsState,
  (state): string | null => state?.error ?? null
);
