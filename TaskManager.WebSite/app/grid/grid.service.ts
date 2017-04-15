import { Inject, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GridService {

    private gridUrl: string;

    constructor(private http: Http, @Inject('API_URL') private apiURL: string) {
        this.gridUrl = apiURL + '/api/grid';  // url to web API
    }

    public saveGrid(task: any): Observable<Response> {
        return this.http.post(this.gridUrl, task);
    }

}