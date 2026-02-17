import { Routes } from '@angular/router';
import { DashboardHomeComponent } from '././dashboard/dashboard-home/dashboard-home.component';
import { authGuard } from './core/guard/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'login', loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent) },
    {path: 'register', loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent)},
    {path: 'dashboard', canActivate: [authGuard], loadComponent: () => import('././dashboard/dashboard-home/dashboard-home.component').then(m => m.DashboardHomeComponent)},
    {path: '**', redirectTo: 'dashboard'}
];
