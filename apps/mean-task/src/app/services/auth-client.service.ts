import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../environments/environment';



export interface AuthUser {
  id: string;
  email: string;
  name?: string;
}

interface AuthResponse {
  accessToken: string;
  user: AuthUser;
}

const TOKEN_KEY = 'auth_token';
const EXPIRY_KEY = 'auth_expiry';
const USER_KEY = 'auth_user';

@Injectable({ providedIn: 'root' })
export class AuthClientService {
  private apiUrl = `${environment.apiUrl}/auth`;

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  private _user$ = new BehaviorSubject<AuthUser | null>(null);
  user$ = this._user$.asObservable();

  constructor(private http: HttpClient) {
    this.restoreSession();
  }

  // 🔄 Restore session on page reload
  private restoreSession() {
    const token = localStorage.getItem(TOKEN_KEY);
    const expiry = localStorage.getItem(EXPIRY_KEY);
    const userJson = localStorage.getItem(USER_KEY);

    if (!token || !expiry) {
      this._isLoggedIn$.next(false);
      this._user$.next(null);
      return;
    }

    const expiryTime = Number(expiry);

    // Token expired
    if (Date.now() > expiryTime) {
      this.logout();
    } else {
      this._isLoggedIn$.next(true);

      if (userJson) {
        try {
          this._user$.next(JSON.parse(userJson));
        } catch {
          this._user$.next(null);
        }
      }
    }
  }

  // 🔐 Save session for 8 hours
  private setSession(token: string, user: AuthUser, hours = 8) {
    const expiresAt = Date.now() + hours * 60 * 60 * 1000;

    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(EXPIRY_KEY, String(expiresAt));
    localStorage.setItem(USER_KEY, JSON.stringify(user));

    this._isLoggedIn$.next(true);
    this._user$.next(user);
  }

  get token(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  get user(): AuthUser | null {
    return this._user$.value;
  }

  // 🔑 Login
  login(email: string, password: string) {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(tap(res => this.setSession(res.accessToken, res.user)));
  }

  // 🆕 Signup
  signup(name: string, email: string, password: string) {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/signup`, { name, email, password })
      .pipe(tap(res => this.setSession(res.accessToken, res.user)));
  }

  // 📩 Forgot password (Request reset link)
  forgotPassword(email: string) {
    return this.http.post<{ message: string }>(`${this.apiUrl}/forgot-password`, {
      email,
    });
  }

resetPassword(token: string, password: string) {
  return this.http.post<{ message: string }>(`${this.apiUrl}/reset-password`, {
    token,
    password, // MUST be password
  });
}



  // 🚪 Logout
  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EXPIRY_KEY);
    localStorage.removeItem(USER_KEY);

    this._isLoggedIn$.next(false);
    this._user$.next(null);
  }
}
