import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GridService {

    // private baseUrl = 'http://jctaskmanagerapi.azurewebsites.net/';
    private baseUrl = 'http://localhost:42992/';
    private gridUrl = this.baseUrl + '/api/grid';  // url to web API

    constructor(private http: Http) { }
    
    saveGrid(task: any): Observable<Response> {
        return this.http.post(this.gridUrl, task);
    }
    
}