// 🔹 Product Model
export interface Product {
  _id?: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  createdAt?: string;   // optional but recommended since you use it in the table
}

// 🔹 NGRX Feature Key
export const PRODUCTS_FEATURE_KEY = 'products';

// 🔹 Products State Interface
export interface ProductsState {
  items: Product[];         // List of products
  loading: boolean;         // Loading flag for API operations
  error: string | null;     // Error message
}

// 🔹 Initial State
export const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};
