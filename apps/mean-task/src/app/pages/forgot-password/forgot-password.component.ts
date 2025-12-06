import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthClientService } from '../../services/auth-client.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  email = '';
  message = '';
  error = '';

  constructor(private auth: AuthClientService) {}

  submit() {
    this.message = '';
    this.error = '';

    this.auth.forgotPassword(this.email).subscribe({
      next: () => {
        this.message = 'A reset link has been sent to your email.';
      },
      error: (err) => {
        this.error = err.error?.message || 'Something went wrong.';
      }
    });
  }
}

