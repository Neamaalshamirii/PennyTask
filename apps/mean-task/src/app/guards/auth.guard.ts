import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthClientService } from '../services/auth-client.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthClientService);
  const router = inject(Router);

  // If we have a token -> allow access
  if (auth.token) {
    return true;
  }

  // No token -> send back to login
  router.navigate(['/login']);
  return false;
};
