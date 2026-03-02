import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../core/service/dashboard.service';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { User } from '../../models/user.model';
import { AuthService } from '../../core/service/auth.service';
import { DashboardData } from '../../models/dashbard.model';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [NavbarComponent, AsyncPipe],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss'
})
export class DashboardHomeComponent implements OnInit{

  currentUser: User | null = null;
  dashboardData$!: Observable<DashboardData>;

  ngOnInit(){
   this.dashboardData$ = this.dashboardService.getDashboardData();
   console.log('Current user is:', this.currentUser);
   console.log('Dashboard data is: ', this.dashboardData$ ? 'PRESENT!' : 'MISSING!');
  }


  constructor(private dashboardService: DashboardService, private authService: AuthService){
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

}
