import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';



@Injectable({ providedIn: 'root' })
export class UsersService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<any[]>(this.apiUrl);
  }
}
