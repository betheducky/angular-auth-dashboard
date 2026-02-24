import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, of } from 'rxjs';
import { DashboardData } from '../../models/dashbard.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

    constructor(private http: HttpClient, private authService: AuthService) {}

    getDashboardData(): Observable<DashboardData> {
      const mockData = {
        user: this.authService.currentUser!,
        projects: [
          'Angular Auth Dashboard',
          'Expense Tracker (Angular)',
          'Book Search App (Angular + Laravel)'
        ],

        tasks: [
          'Implement route guard',
          'Wire up HTTP interceptor',
          'Connect dashboard service to API',
          'Refactor auth state handling'
        ],

        alerts: [
          'New login detected',
          'Project deadline approaching',
          'Password expires in 5 days'
        ],

        stats: {
          infoMessage: 'You have active work that needs attention.',
          projectCount: 3,
          taskCount: 4,
          alertCount: 3
        }
      }

      return of(mockData).pipe(delay(800));
    }

}
