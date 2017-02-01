import { Component, OnInit } from '@angular/core';

import { Http, Response } from '@angular/http';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'tasks',
    template: `
    <h1>{{title}}</h1>
    <div *ngIf='!isLoading' >
        <form   [formGroup]="addTaskForm"
                (ngSubmit)="onSubmit(addTaskForm.value)">
            <div class="input-group">
                <input  class="form-control"
                        placeholder="new task"
                        type="text"
                        id="name"
                        autocomplete="off"
                        [formControl]="addTaskForm.controls['name']">
                <span class="input-group-btn">
                    <button class="btn btn-default" type="submit">add</button>
                </span>
            </div>

        </form>
        <ul class="list-group">
           <li *ngFor='let item of data' class="list-group-item">
              <a [routerLink]="['task', item.id]">{{item.name}}</a>
           </li>
        </ul>
    </div>
    <div *ngIf='isLoading || isAdding' class="table-loader">
        <img src="/img/table-loading.gif" />
    </div>
`
})

export class TaskListComponent implements OnInit {
    public title: string;
    public data: Object[];
    public addTaskForm: FormGroup;
    public addTaskNameField: FormControl;
    public isLoading: boolean = false;
    public isAdding: boolean = false;

    private baseUrl = 'http://jctaskmanagerapi.azurewebsites.net/';
    // private baseUrl = 'http://localhost:42992/';
    private tasksUrl = this.baseUrl + '/api/task';  // url to web API

    constructor(private http: Http, private fb: FormBuilder) {
        this.title = 'tasks';
    }

    public ngOnInit() {
        this.addTaskNameField = new FormControl('');
        this.addTaskForm = this.fb.group({
            'name': this.addTaskNameField
        });

        this.isLoading = true;
        this.loadTasks();
    }

    public onSubmit(form: any): void {
        console.log('you submitted value:', form);
        this.isAdding = true;
        this.http.post(this.tasksUrl, form)
            .subscribe((res: Response) => {
                console.log(res.statusText);
                this.isAdding = false;
                this.loadTasks();
            });
    }

    public loadTasks() {
        this.http.get(this.tasksUrl)
            .subscribe((res: Response) => {
                this.data = res.json();
                this.isLoading = false;
            });
    }

}