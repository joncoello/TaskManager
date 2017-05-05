import { Inject, Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { TaskViewModel, TaskItem, TaskListViewModel } from './task.model';
import 'rxjs/add/operator/map';
import { HttpClient } from '../shared/httpclient';

// Service for managing tasks
@Injectable()
export class TaskService {

    private tasksUrl: string;

    constructor(private http: HttpClient, @Inject('API_URL') private apiURL: string) {
        this.tasksUrl = this.apiURL + '/api/task';
    }

    // when we get the list of tasks we want to group by category
    // so the flat list needs to be projected into a hierrachy
    public getTasks(categoryName: string): Observable<TaskListViewModel[]> {

        // optional category filter
        return this.http.get(this.tasksUrl + (categoryName ? '?categoryName=' + categoryName : ''))

            .map((response: Response) => {
                var taskListVM = new Array<TaskListViewModel>();
                var tasks = <TaskItem[]>response.json();

                for (let task of tasks) {

                    // performance ?
                    var taskGroup = taskListVM.find((t: TaskListViewModel) => t.categoryID === task.category.taskCategoryID);
                    if (taskGroup === undefined) {
                        taskGroup = new TaskListViewModel();
                        taskGroup.categoryID = task.category.taskCategoryID;
                        taskGroup.categoryName = task.category.categoryName;
                        taskListVM.push(taskGroup);
                    }
                    taskGroup.tasks.push(task);
                }

                return taskListVM;
            });
    }

    // when getting a single task return the list of categories to populate the drop down
    public getTask(taskID: string): Observable<TaskViewModel> {
        return this.http.get(this.tasksUrl + '/' + taskID)
            .map((response: Response) => {
                return <TaskViewModel>response.json();
            });
    }

    // create and update should return the task ?
    public createTask(task: TaskItem): Observable<Response> {
        return this.http.post(this.tasksUrl, task);
    }

    public updateTask(task: TaskItem): Observable<Response> {
        return this.http.patch(this.tasksUrl, task);
    }

    public deleteTask(taskID: string): Observable<Response> {
        return this.http.delete(this.tasksUrl + '/' + taskID);
    }

}