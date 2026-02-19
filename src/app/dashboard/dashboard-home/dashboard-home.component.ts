import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../core/service/dashboard.service';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { User } from '../../models/user.model';
import { AuthService } from '../../core/service/auth.service';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss'
})
export class DashboardHomeComponent implements OnInit {

  data: any;
  currentUser: User | null = null;


  constructor(private dashboardService: DashboardService, private authService: AuthService){
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    } )
  }

  ngOnInit(): void {
      this.dashboardService.getDashboardData().subscribe(data => this.data = data)
  }

}
