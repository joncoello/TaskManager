import { Inject, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { TaskViewModel, TaskItem, TaskListViewModel, TaskCategory } from './task.model';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskService {

    private tasksUrl: string;

    constructor(private http: Http, @Inject('API_URL') private apiURL: string) {
        this.tasksUrl = this.apiURL + '/api/task';
    }

    public getTasks(): Observable<TaskListViewModel[]> {
        return this.http.get(this.tasksUrl)
            .map((response: Response) => {
                var taskListVM = new Array<TaskListViewModel>();
                var tasks = <TaskItem[]>response.json();

                for (let task of tasks) {

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

    public getTask(taskID: string): Observable<TaskViewModel> {
        return this.http.get(this.tasksUrl + '/' + taskID)
            .map((response: Response) => {
                return <TaskViewModel>response.json();
            });
    }

    public createTask(task: TaskItem): Observable<Response> {
        return this.http.post(this.tasksUrl, task);
    }

    public updateTask(task: TaskItem): Observable<Response> {
        return this.http.patch(this.tasksUrl + '/' + task.taskItemID, task);
    }

    public deleteTask(taskID: string): Observable<Response> {
        return this.http.delete(this.tasksUrl + '/' + taskID);
    }

}