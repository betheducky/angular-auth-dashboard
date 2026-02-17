import { AuthService } from "../service/auth.service";
import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export const authGuard: CanActivateFn = () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (auth.isAuthenticated) return true;

    router.navigate(['/login']);
    return false;
}