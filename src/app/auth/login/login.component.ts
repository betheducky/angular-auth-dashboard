import { Component } from '@angular/core';
import { AuthService } from '../../core/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router){}

  handleLogin() {
    this.authService.login(this.loginForm.value).subscribe(() => {
      this.router.navigate(['/dashboard']);
    })
  }

  handleRegister() {
    this.authService.register(this.registerForm.value).subscribe(() => {
      this.router.navigate(['/dashboard']);
    })
  }

}
