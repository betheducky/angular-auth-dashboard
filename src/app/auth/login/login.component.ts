import { Component } from '@angular/core';
import { AuthService } from '../../core/service/auth.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, Validators, NonNullableFormBuilder } from '@angular/forms';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { User } from '../../models/user.model';
import { LoginRequest } from '../../models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  currentUser: User | null = null;
  hide: boolean = true;

  constructor(private authService: AuthService, private router: Router, private fb: NonNullableFormBuilder){}

  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(8), Validators.maxLength(20), Validators.required]]
  });

  handleLogin() {
    if(this.loginForm.invalid) return;

    const request: LoginRequest = this.loginForm.getRawValue();
    this.authService.login(request).subscribe({
      next: () => {
      this.router.navigate(['/dashboard']);
    },
      error: (err) => {
        if(err.type === 'INVALID_CREDENTIALS'){
          this.loginForm.setErrors({ invalidCredentials: true });
        }
    }
  })
  }

  toggleHidePassword(): void {
    this.hide = !this.hide;
  }
}
