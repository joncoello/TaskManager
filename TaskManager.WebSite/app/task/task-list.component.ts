import { Component, OnInit } from '@angular/core';

import { Http, Response } from '@angular/http';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { TaskService } from './task.service';

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
        <div class="list-group">
            <a *ngFor='let item of data' class="list-group-item" [routerLink]="['task', item.id]">
                <h4 class="list-group-item-heading">{{item.name}}</h4>
                <p class="list-group-item-text">{{item.body}}</p>
            </a>
        </div>
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
    
    constructor(private fb: FormBuilder, private taskService: TaskService) {
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
        this.addTaskNameField.setValue('');
        console.log('you submitted value:', form);
        this.isAdding = true;
        this.taskService.createTask(form)
            .subscribe((res: Response) => {
                console.log(res.statusText);
                this.isAdding = false;
                this.loadTasks();
            });
    }

    public loadTasks() {
        this.taskService.getTasks()
            .subscribe((res: Response) => {
                this.data = res.json();
                this.isLoading = false;
            });
    }

}