import { Component } from '@angular/core';

import { Http, Response } from '@angular/http';

import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'tasks',
    template: `
    <h1>{{title}}</h1>
    <form   [formGroup]="myForm"
            (ngSubmit)="onSubmit(myForm.value)">

        <input  type="text"
                id="name"
                [formControl]="myForm.controls['name']">

        <button type="submit">Submit</button>

    </form>
    <ul>
       <li *ngFor='let item of data'>
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
    private helloUrl = this.baseUrl + '/api/hello';  // url to web API
    private tasksUrl = this.baseUrl + '/api/task';  // url to web API

    constructor(private http: Http, fb: FormBuilder) {
        this.title = 'loading...';

        this.myForm = fb.group({
            'name': ['ABC123']
        });

        this.http.get(this.helloUrl)
            .subscribe((res: Response) => {
                this.title = res.json().message;
            });

        this.http.get(this.tasksUrl)
            .subscribe((res: Response) => {
                this.data = res.json();
            });
    }

    onSubmit(form: any): void {
        console.log('you submitted value:', form);
        this.http.post(this.tasksUrl, form)
            .subscribe((res: Response) => {
                console.log(res.statusText);
            });
    }

}