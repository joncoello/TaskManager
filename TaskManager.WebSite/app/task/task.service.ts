import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TaskService {

    private baseUrl = 'http://jctaskmanagerapi.azurewebsites.net/';
    // private baseUrl = 'http://localhost:42992/';
    private tasksUrl = this.baseUrl + '/api/task';  // url to web API

    constructor(private http: Http) { }

    getTasks(): Observable<Response> {
        return this.http.get(this.tasksUrl)
    }

    getTask(taskID: string): Observable<Response> {
        return this.http.get(this.tasksUrl + '/' + taskID)
    }

    createTask(task: any): Observable<Response> {
        return this.http.post(this.tasksUrl, task);
    }

    updateTask(task: any): Observable<Response> {
        return this.http.patch(this.tasksUrl + '/' + task.id, task);
    }

}