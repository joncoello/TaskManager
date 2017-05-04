/* tslint:disable:no-any */

import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { LoginService } from '../login/login.service';

@Injectable()
export class HttpClient {

    constructor(private http: Http, private loginService: LoginService) { }

    private createAuthorizationHeader(headers: Headers): void {
        if (this.loginService.isLoggedIn) {
            headers.append('Authorization', 'Bearer ' +
                this.loginService.tokenData.access_token);
        }
    }

    public get(url: string): Observable<Response> {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.get(url, {
            headers: headers
        });
    }

    public post(url: string, data: any): Observable<Response> {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        var o = this.http.post(url, data, {
            headers: headers
        });

        return o;
    }

    public patch(url: string, data: any): Observable<Response> {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.patch(url, data, {
            headers: headers
        });
    }

    public delete(url: string): Observable<Response> {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.delete(url, {
            headers: headers
        });
    }
}