import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Injectable()
export class LoggedInGuard implements CanActivate {

    constructor(private loginService: LoginService, private router: Router) {
    }

    public canActivate(): boolean {
        if (!this.loginService.isLoggedIn) {
            this.router.navigate(['']);
        }
        return this.loginService.isLoggedIn;
    }
}