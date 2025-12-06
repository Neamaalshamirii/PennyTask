import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private apiUrl = `${environment.apiUrl}/stats`;
  constructor(private http: HttpClient) {}

  // GET dashboard stats
  getStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/stats`);
  }

  // GET list of all users
  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }
}
