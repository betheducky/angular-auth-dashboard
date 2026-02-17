import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";
import { AuthService } from "../service/auth.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const cloned = req.clone({
        withCredentials: true
    })

    return next(cloned).pipe(
        catchError( err => {
            if(err.status === 401) {
                const auth = inject(AuthService);
                const router = inject(Router);
                auth.logout();
                router.navigate(['/login']);
            }
            return throwError(() => err);
        })
    );
}
