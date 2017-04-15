import { Inject, Component } from '@angular/core';

import { Http, Response } from '@angular/http';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'category',
    template: `
        <h2>{{pageTitle}}</h2>
        <div *ngIf='!isLoading' >
        <form   [formGroup]="addTaskForm"
                (ngSubmit)="onSubmit(addTaskForm.value)">

            <div class="form-group">
                <label class="control-label">Create new</label>
                <div class="input-group">

                    <input  class="form-control"
                            placeholder="new task"
                            type="text"
                            id="categoryName"
                            autocomplete="off"
                            [formControl]="addTaskForm.controls['categoryName']">
                    <span class="input-group-btn">
                        <button class="btn btn-default" type="submit">add</button>
                    </span>
                </div>
            </div>
        </form>
        <table class="table table-striped table-hover">
            <tr *ngFor='let item of data'>
                <td>
                    <a [routerLink]="['task', item.taskCategoryID]">{{item.categoryName}}</a>
                </td>
                <td>
                  <a    class="btn btn-danger btn-xs delete-button" 
                        (click)="deleteCategory(item.taskCategoryID)">
                    <i class="fa fa-trash-o fa-sm"></i></a>
                </td>
           </tr>
        </table>
    </div>
    <div *ngIf='isLoading || isAdding' class="table-loader">
        <img src="/img/gears.gif" />
    </div>
        `
})
export class CategoryListComponent {
    public pageTitle: string;
    public data: Object[];
    public addTaskForm: FormGroup;
    public addTaskNameField: FormControl;
    public isLoading: boolean = false;
    public isAdding: boolean = false;

    private tasksUrl: string;

    constructor(private http: Http, private fb: FormBuilder, @Inject('API_URL') private apiURL: string) {
        this.tasksUrl = apiURL + '/api/category';  // url to web API
        this.pageTitle = 'categories';
    }

    public ngOnInit() {
        this.addTaskNameField = new FormControl('');
        this.addTaskForm = this.fb.group({
            'categoryName': this.addTaskNameField
        });

        this.isLoading = true;
        this.loadTasks();
    }

    public onSubmit(form: any): void {
        this.addTaskNameField.setValue('');
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

    public deleteCategory(categoryToDeleteID: any) {
        this.http.delete(this.tasksUrl + '/' + categoryToDeleteID)
            .subscribe((res: Response) => {
                console.log(res.statusText);
                this.loadTasks();
            });
    }

}