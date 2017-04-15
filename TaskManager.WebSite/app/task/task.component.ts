/* tslint:disable:no-string-literal */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { TaskService } from './task.service';

@Component({
    selector: 'task',
    template: `
        
        <form   id="taskEdit"
                [formGroup]="myForm"
                (ngSubmit)="onSubmit(myForm.value)">
            
            <div class="form-group">
                <label for="nameInput">Name</label>
                <input  class="form-control"
                        type="text"
                        id="nameInput"
                        placeholder="Name"
                        [formControl]="myForm.controls['taskName']">
            </div>
            <div *ngIf="myForm.controls['taskName'].hasError('required')" class="alert alert-danger" role="alert">
                <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                <span class="sr-only">Error:</span>
                Name is a required field
            </div>

            <div class="form-group">
                <label for="nameInput">Category</label>
                <select class="form-control"
                        id="cateogryInput"
                        [formControl]="myForm.controls['taskCategoryID']">
                    <option *ngFor='let item of categories' value='{{item.taskCategoryID}}'>
                        {{item.categoryName}}
                    </option>
                </select>
            </div>

            <div class="form-group">       
                <label for="body">Body</label>
                <textarea   id="body" 
                            style="height: 100px;"
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
    public categoryField: FormControl;
    public bodyField: FormControl;
    public categories: any;

    private taskID: string;

    constructor(private taskService: TaskService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router) {
        this.idField = new FormControl('', Validators.required);
        this.nameField = new FormControl('', Validators.required);
        this.categoryField = new FormControl('');
        this.bodyField = new FormControl('');
        this.myForm = this.fb.group({
            'taskItemID': this.idField,
            'taskName': this.nameField,
            'taskCategoryID': this.categoryField,
            'body': this.bodyField
        });
    }


    public ngOnInit() {

        this.route.params.subscribe((params: { [key: string]: any  }) => {
            this.taskID = params['id'];

            this.pageTitle = this.taskID;

            this.taskService.getTask(this.taskID)
                .map((response: Response) => {
                    return (<any>response.json);
                });
                // .subscribe((res: Response) => {
                //    console.log(res);
                //    this.idField.patchValue(res.json().task.taskItemID);
                //    this.nameField.patchValue(res.json().task.taskName);
                //    this.categoryField.patchValue(res.json().task.taskCategoryID);
                //    this.bodyField.patchValue(res.json().task.body);
                //    console.log('updated');

                //    this.categories = res.json().categories;
                // });

        });
    }

    public onSubmit(form: any): void {
        console.log('you submitted value:', form);

        this.taskService.updateTask(form)
            .subscribe((res: Response) => {
                console.log(res);
                this.router.navigateByUrl('/tasks');
            });

    }

}