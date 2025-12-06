import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthClientService } from '../../services/auth-client.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent implements OnInit {

  password = '';
  confirmPassword = '';
  token = '';
  error = '';
  message = '';

  constructor(
    private route: ActivatedRoute,
    private auth: AuthClientService,
    private router: Router
  ) {}

  ngOnInit() {
    // ✅ Correct way (ROUTE PARAM)
    this.route.paramMap.subscribe(params => {
      this.token = params.get('token') || '';
    });
  }

  submit() {
    this.error = '';
    this.message = '';

    if (!this.password || !this.confirmPassword) {
      this.error = 'Please fill out both fields.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match.';
      return;
    }

    this.auth.resetPassword(this.token, this.password).subscribe({
      next: () => {
        this.message = 'Password successfully reset. Redirecting...';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.error = err.error?.message || 'Something went wrong.';
      },
    });
  }
}
