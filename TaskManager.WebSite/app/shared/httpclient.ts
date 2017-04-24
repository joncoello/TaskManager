import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { LoginService } from '../login/login.service';

@Injectable()
export class HttpClient {

    constructor(private http: Http, private loginService: LoginService) { }

    private createAuthorizationHeader(headers: Headers) {
        if (this.loginService.isLoggedIn) {
            headers.append('Authorization', 'Bearer ' +
                this.loginService.tokenData.access_token);
        }
    }

    public get(url: string) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.get(url, {
            headers: headers
        });
    }

    public post(url: string, data: any) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.post(url, data, {
            headers: headers
        });
    }

    public patch(url: string, data: any) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.patch(url, data, {
            headers: headers
        });
    }

    public delete(url: string) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.delete(url, {
            headers: headers
        });
    }
}