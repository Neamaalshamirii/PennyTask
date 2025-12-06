import { Route } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { SignupComponent } from './pages/signup/signup';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { authGuard } from './guards/auth.guard';
import { ProductsComponent } from './pages/products/products';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],   // 🔒 protected
  },
   { path: 'products', component: ProductsComponent, canActivate: [authGuard] },
   {
  path: 'forgot-password',
  loadComponent: () =>
    import('./pages/forgot-password/forgot-password.component')
      .then(m => m.ForgotPasswordComponent)
},
{
  path: 'reset-password/:token',
  loadComponent: () =>
    import('./pages/reset-password/reset-password.component')
      .then(m => m.ResetPasswordComponent)
}


];
