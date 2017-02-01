import { Component } from '@angular/core';

import { Http, Response } from '@angular/http';

import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'tasks',
    template: `
    <h1>{{title}}</h1>
    <form   [formGroup]="myForm"
            (ngSubmit)="onSubmit(myForm.value)">
        <div class="input-group">
            <input  class="form-control"
                    placeholder="new task"
                    type="text"
                    id="name"
                    [formControl]="myForm.controls['name']">
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
`
})

export class TaskListComponent {
    title: string;
    data: Object[];
    myForm: FormGroup;

    private baseUrl = 'http://jctaskmanagerapi.azurewebsites.net/';
    private tasksUrl = this.baseUrl + '/api/task';  // url to web API

    constructor(private http: Http, fb: FormBuilder) {
        this.title = 'tasks';

        this.myForm = fb.group({
            'name': ['']
        });

        this.loadTasks();
        
    }

    onSubmit(form: any): void {
        console.log('you submitted value:', form);
        this.http.post(this.tasksUrl, form)
            .subscribe((res: Response) => {
                console.log(res.statusText);
                this.loadTasks();
            });
    }

    loadTasks() {
        this.http.get(this.tasksUrl)
            .subscribe((res: Response) => {
                this.data = res.json();
            });
    }

}