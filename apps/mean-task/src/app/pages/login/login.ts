import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';   // ✅ ADDED RouterLink
import { AuthClientService } from '../../services/auth-client.service';

@Component({
  selector: 'app-login',
  standalone: true,
 
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  email = '';
  password = '';
  

  loading = false;
  error: string | null = null;

  constructor(
    private auth: AuthClientService,
    private router: Router
  ) {}

  onSubmit() {
    this.error = null;

    if (!this.email || !this.password) {
      this.error = 'Please fill all fields';
      return;
    }

    this.loading = true;

    this.auth.login(this.email, this.password).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message || 'Invalid email or password';
      }
    });
  }
}
