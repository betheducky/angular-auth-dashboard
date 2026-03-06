import { Component } from '@angular/core';
import { AuthService } from '../../core/service/auth.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, Validators, NonNullableFormBuilder } from '@angular/forms';
import { User } from '../../models/user.model';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { RegisterRequest } from '../../models/auth.model';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  currentUser$!: Observable<User | null>;
  hide: boolean = true;

  // CHECK IF VALID

  passwordMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const pw = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return confirm === pw ? null : {mismatch: true}
  }

  registerForm = this.fb.group({
    name: ['', [Validators.minLength(5), Validators.maxLength(15), Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(8), Validators.maxLength(20), Validators.required]],
    confirmPassword: ['', [Validators.minLength(8), Validators.maxLength(20), Validators.required]],
  }, { validators: this.passwordMatchValidator})

  constructor(private router: Router, private authService: AuthService, private fb: NonNullableFormBuilder){}

  toggleHidePassword(): void {
    this.hide = !this.hide;
  }

  handleRegister() {
    if(this.registerForm.invalid) return;

    const request: RegisterRequest = this.registerForm.getRawValue();
    this.authService.register(request).subscribe(() => {
      this.router.navigate(['/dashboard']);
    })
  }

}
