/* tslint:disable:no-any */

import { Inject, Component } from '@angular/core';

import { Response } from '@angular/http';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { HttpClient } from '../shared/httpclient';

@Component({
    selector: 'category',
    templateUrl: './app/category/category-list.component.html'
})
export class CategoryListComponent {
    public pageTitle: string;
    public data: Object[];
    public addTaskForm: FormGroup;
    public addTaskNameField: FormControl;
    public isLoading: boolean = false;
    public isAdding: boolean = false;

    private tasksUrl: string;

    constructor(private http: HttpClient, private fb: FormBuilder, @Inject('API_URL') private apiURL: string) {
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
                this.pageTitle = 'categories (' + this.data.length + ')';
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