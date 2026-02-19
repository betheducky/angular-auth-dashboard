import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  getDashboardData() {
    return this.http.get(`${environment.apiUrl}/dashboard`);
  }

  constructor(private http: HttpClient) {}
}
