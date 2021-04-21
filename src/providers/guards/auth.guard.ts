import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private authenticationService: AuthenticationService, private router: Router,) { }

    /**
     * Lets navigation to Home Page if there is a logged user, but does't allow the access to this
     * page if there is not a logged user.
     * @returns true if there is a logged user, false if not.
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.getAuthenticatedUser();
        if (currentUser) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}
