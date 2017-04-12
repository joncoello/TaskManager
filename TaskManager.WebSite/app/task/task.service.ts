import { Inject, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TaskService {

    private tasksUrl: string;
    
    constructor(private http: Http, @Inject('API_URL') private apiURL: string) {
        this.tasksUrl = this.apiURL + '/api/task';
    }

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

    deleteTask(taskID: string): Observable<Response> {
        return this.http.delete(this.tasksUrl + '/' + taskID);
    }

}