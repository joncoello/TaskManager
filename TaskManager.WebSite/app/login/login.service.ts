import { Inject, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { TokenModel } from './login.model';

@Injectable()
export class LoginService {

    public tokenData: TokenModel;
    public isLoggedIn: boolean;

    constructor(private http: Http, @Inject('API_URL') private apiURL: string) {
    }

    public login(loginModel: any, callback: (ok: boolean) => void): void {
        this.http.post(this.apiURL + '/token', loginModel)
            .subscribe(
            (response: Response) => {
                this.processResponse(response, true, callback);
            },
            (response: Response) => {
                this.processResponse(response, false, callback);
            });
    }

    private processResponse(response: Response, ok: boolean, callback: (ok: boolean) => void): void {
        this.isLoggedIn = ok;
        this.tokenData = response.json();
        callback(ok);
    }

}