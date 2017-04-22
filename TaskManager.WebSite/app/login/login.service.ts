import { Inject, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
    
    constructor(private http: Http, @Inject('API_URL') private apiURL: string) {
    }

    public login(loginModel: any): Observable<Response> {
        return this.http.post(this.apiURL + '/token', loginModel);
    }

}