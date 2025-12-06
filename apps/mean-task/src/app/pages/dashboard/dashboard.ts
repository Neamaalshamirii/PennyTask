import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Angular common imports needed for your template
import { NgForOf, NgIf, NgClass, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';   // ✅ REQUIRED for routerLink

import { AuthClientService } from '../../services/auth-client.service';
import { StatsService } from '../../services/stats.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgForOf,       // *ngFor
    NgIf,          // *ngIf
    NgClass,       // [ngClass]
    DatePipe,      // date pipe
    RouterModule   // ✅ Needed for routerLink="/products"
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit {

  stats = {
    users: 0,
    loginsToday: 0,
    newUsersThisWeek: 0
  };

  users: any[] = [];

  constructor(
    private auth: AuthClientService,
    private statsService: StatsService,
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {

    // Load statistics
    this.statsService.getStats().subscribe((data) => {
      this.stats.users = data.totalUsers;
      this.stats.loginsToday = data.loginsToday;
      this.stats.newUsersThisWeek = data.newUsersThisWeek;
    });

    // Load users list
    this.usersService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  get displayName(): string {
    const user = this.auth.user;
    return user?.name || user?.email || 'there';
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
