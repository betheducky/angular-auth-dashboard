import { Component } from '@angular/core';
import { AuthService } from '../../core/service/auth.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  @Input() user: User | null = null;

  constructor(private authService: AuthService, private router: Router){}

  login() {
    this.router.navigate(['/login']);
  }

  register() {
    this.router.navigate(['/register']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
