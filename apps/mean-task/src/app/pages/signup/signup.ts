import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

import { AuthClientService } from '../../services/auth-client.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class SignupComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  error: string | null = null;
  loading = false;

  constructor(
    private auth: AuthClientService,
    private router: Router
  ) {}

  onSubmit() {
    this.error = null;

    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }

    this.loading = true;

    this.auth.signup(this.name, this.email, this.password).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message || 'Signup failed';
      }
    });
  }
}
