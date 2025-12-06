import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom
} from '@angular/core';

import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { appRoutes } from './app.routes';

// NGRX imports
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { productsReducer } from './pages/products/store/products.reducer';
import * as ProductsEffects from './pages/products/store/products.effects';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    importProvidersFrom(HttpClientModule),

    // 🔥 NGRX Store + Effects (Best Practice)
    provideStore({
      products: productsReducer,
    }),

    provideEffects(ProductsEffects),
  ],
};
