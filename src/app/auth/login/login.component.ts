import { Component } from '@angular/core';
import { AuthService } from '../../core/service/auth.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder){}

  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(8), Validators.maxLength(20)]]
  });

  registerForm = this.fb.group({
    username: ['', [Validators.minLength(5), Validators.maxLength(12), Validators.required]],
    password: ['', [Validators.minLength(8), Validators.maxLength(20)]],
    confirmPassword: ['', [Validators.minLength(8), Validators.maxLength(20)]]
  })

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
