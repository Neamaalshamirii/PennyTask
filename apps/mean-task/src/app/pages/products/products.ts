import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  NgForOf,
  CurrencyPipe,
  NgIf,
  NgClass,
  DatePipe,
  AsyncPipe
} from '@angular/common';

import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Product } from './store/products.state';

// NGRX selectors & actions
import {
  selectProducts,
  selectProductsLoading
} from './store/products.selectors';

import {
  loadProducts,
  addProduct
} from './store/products.actions';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgClass,
    CurrencyPipe,
    DatePipe,
    FormsModule,
    AsyncPipe // REQUIRED for | async
  ],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class ProductsComponent implements OnInit {

  // Properly typed Observables
  products$!: Observable<Product[]>;
  loading$!: Observable<boolean>;

  showModal = false;

  newProduct: Product = {
    name: '',
    price: 0,
    stock: 0,
    category: 'Electronics'
  };

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {

    // Correctly typed selectors
    this.products$ = this.store.select(selectProducts);
    this.loading$ = this.store.select(selectProductsLoading);

    // Load products from API (via NGRX effect)
    this.store.dispatch(loadProducts());
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.newProduct = {
      name: '',
      price: 0,
      stock: 0,
      category: 'Electronics'
    };
  }

  addProduct() {
    this.store.dispatch(addProduct({ product: this.newProduct }));
    this.closeModal();
  }
}
