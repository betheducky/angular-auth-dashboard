import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../models/user.model';
import { AuthResponse } from '../../models/auth-response.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  get isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('user');
    if(storedUser){
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
   }

   login(credentials: any) {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/login`, credentials)
    .pipe(
      tap(res => {
        localStorage.setItem('user', JSON.stringify(res.user));
        this.currentUserSubject.next(res.user);
      })
    );
   }

   register(credentials: any) {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/register`, credentials)
    .pipe(
      tap(res => {
        localStorage.setItem('user', JSON.stringify(res.user));
        this.currentUserSubject.next(res.user);
      })
    )
   }

   logout() {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
   }


}
