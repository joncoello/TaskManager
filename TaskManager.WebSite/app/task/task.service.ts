/* tslint:disable:no-any */

import { Inject, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { TaskViewModel } from './task.model';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskService {

    private tasksUrl: string;

    constructor(private http: Http, @Inject('API_URL') private apiURL: string) {
        this.tasksUrl = this.apiURL + '/api/task';
    }

    public getTasks(): Observable<Response> {
        return this.http.get(this.tasksUrl);
    }

    public getTask(taskID: string): Observable<TaskViewModel> {
        return this.http.get(this.tasksUrl + '/' + taskID)
            .map((response: Response) => {
                return <TaskViewModel>response.json();
            });
    }

    public createTask(task: any): Observable<Response> {
        return this.http.post(this.tasksUrl, task);
    }

    public updateTask(task: any): Observable<Response> {
        return this.http.patch(this.tasksUrl + '/' + task.taskItemID, task);
    }

    public deleteTask(taskID: string): Observable<Response> {
        return this.http.delete(this.tasksUrl + '/' + taskID);
    }

}