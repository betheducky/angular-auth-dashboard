import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { of, delay, tap, throwError, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private storageKey: string = 'authUser';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  get isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  constructor(private http: HttpClient) {
    const authorizedUser = localStorage.getItem(this.storageKey);
    if(authorizedUser){
      this.currentUserSubject.next(JSON.parse(authorizedUser));
    }
   }

   login(credentials: any) {

    const DEMO_EMAIL = 'demo@email.com';
    const DEMO_PASSWORD = 'password';

    if(credentials.email === DEMO_EMAIL
      && credentials.password === DEMO_PASSWORD) {
        const user: User = {
        id: 1,
        name: "Demo User",
        email: credentials.email,
        createdAt: new Date()
    }

      return of(user).pipe(
        delay(800),
        tap(u => {
          localStorage.setItem(this.storageKey, JSON.stringify(u));
          this.currentUserSubject.next(u);
        })
      )
    }

    return throwError(() => new Error('Invalid Credentials'));
    
   }

   register(credentials: any) {

    const newUser: User = {
      id: 1,
      name: credentials.name,
      email: credentials.email,
      createdAt: new Date()
    }

    return of(newUser).pipe(
      delay(800),
      tap(res => {
        localStorage.setItem(this.storageKey, JSON.stringify(res));
        this.currentUserSubject.next(res);
      })
    );
   }


   logout() {
    localStorage.removeItem(this.storageKey);
    this.currentUserSubject.next(null);
   }

   
}
