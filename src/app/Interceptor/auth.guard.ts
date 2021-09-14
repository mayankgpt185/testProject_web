import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth-service/auth.service';
// import { I18nService } from 'src/app/service/i18n.service';
// import { RoleService } from 'src/app/service/role.service';
// import { ToastService } from 'src/app/service/toast.service';



@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (sessionStorage.getItem("tokenNo")) {
            return true;
        } else {
            // not logged in so redirect to login page with the return url
            // console.log("false");
            // this.router.events.subscribe(event => {
            // if (event instanceof NavigationEnd) {
            if (this.router.url != "/login" && this.router.url != "/" && !this.router.url.includes("/sign-up")) {
                this.authenticationService.redirectToLogin();

                // this.authenticationService.redirectToLogin();
                return false;
            }
        }
    }
}