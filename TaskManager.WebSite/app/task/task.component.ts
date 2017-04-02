/* tslint:disable:no-string-literal */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Http, Response } from '@angular/http';

import { TaskService } from './task.service';

@Component({
    selector: 'task',
    template: `
        
        <form   id="taskEdit"
                [formGroup]="myForm"
                (ngSubmit)="onSubmit(myForm.value)">
            <div class="form-group">
                <label>ID</label>
                <label class="form-control">
                    {{ idField.value }}
                </label>
            </div>
            <div class="form-group">
                <label for="nameInput">Name</label>
                <input  class="form-control"
                        type="text"
                        id="nameInput"
                        placeholder="Name"
                        [formControl]="myForm.controls['name']">
            </div>
                <div *ngIf="myForm.controls['name'].hasError('required')" class="alert alert-danger" role="alert">
                  <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                  <span class="sr-only">Error:</span>
                  Name is a required field
                </div>
            <div class="form-group">       
                <label for="body">Body</label>
                <textarea   id="body" 
                            style="height: 200px;"
                            class="form-control" 
                            placeholder="Description" 
                            required
                            [formControl]="myForm.controls['body']">
                </textarea>
            </div>
            <button class="btn btn-primary" type="submit">Submit</button>
        </form>
    `
})
export class TaskComponent implements OnInit {
    public pageTitle: string = 'Task';
    public myForm: FormGroup;
    public idField: FormControl;
    public nameField: FormControl;
    public bodyField: FormControl;

    private taskID: string;

    constructor(private taskService: TaskService, private route: ActivatedRoute, private fb: FormBuilder) {
        this.idField = new FormControl('', Validators.required);
        this.nameField = new FormControl('', Validators.required);
        this.bodyField = new FormControl('');
        this.myForm = this.fb.group({
            'id': this.idField,
            'name': this.nameField,
            'body': this.bodyField
        });
    }

    public ngOnInit() {

        this.route.params.subscribe((params: { [key: string]: any }) => {
            this.taskID = params['id'];

            this.pageTitle = this.taskID;

            this.taskService.getTask(this.taskID)
                .subscribe((res: Response) => {
                    console.log(res);
                    this.idField.patchValue(res.json().task.id);
                    this.nameField.patchValue(res.json().task.name);
                    this.bodyField.patchValue(res.json().task.body);
                    console.log('updated');
                });

        });
    }

    public onSubmit(form: any): void {
        console.log('you submitted value:', form);

        this.taskService.updateTask(form)
            .subscribe((res: Response) => {
                console.log(res);
            });

    }

}