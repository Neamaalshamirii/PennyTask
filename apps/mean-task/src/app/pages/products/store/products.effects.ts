import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductsActions from './products.actions';
import { ProductsService } from '../../../services/products.service';
import { catchError, map, mergeMap, of } from 'rxjs';

export const ProductsEffects = createEffect(
  (
    actions$ = inject(Actions),
    productsService = inject(ProductsService)
  ) => {
    return actions$.pipe(
      ofType(ProductsActions.loadProducts),
      mergeMap(() =>
        productsService.getProducts().pipe(
          map((products) =>
            ProductsActions.loadProductsSuccess({ products })
          ),
          catchError((error) =>
            of(ProductsActions.loadProductsFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const AddProductEffect = createEffect(
  (
    actions$ = inject(Actions),
    productsService = inject(ProductsService)
  ) => {
    return actions$.pipe(
      ofType(ProductsActions.addProduct),
      mergeMap(({ product }) =>
        productsService.addProduct(product).pipe(
          map((created) =>
            ProductsActions.addProductSuccess({ product: created })
          ),
          catchError((error) =>
            of(ProductsActions.addProductFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);
