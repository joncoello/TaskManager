import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '../shared/httpclient';
import { Response } from '@angular/http';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'list',
    templateUrl: './app/list/list.component.html'
})
export class ListComponent implements OnInit {
    public pageTitle: string = 'list';
    public formData: any;
    public data: any;
    public insertForm: FormGroup;
    public nameField: FormControl;

    private entityUrl: string;

    constructor(private http: HttpClient, @Inject('API_URL') private apiURL: string, private fb: FormBuilder) {

    }

    public ngOnInit(): void {

        // meta data
        this.formData = {
            idField: 'taskCategoryID',
            fields: [
                { id: 'categoryName' }
            ],
            url: '/api/category'
        };

        // form

        //this.nameField = new FormControl('');
        //this.insertForm = this.fb.group({
        //    categoryName: this.nameField
        //});

        let formDef: any = {};
        for (let field of this.formData.fields) {
            formDef[field.id] = new FormControl('');
        }
        this.insertForm = this.fb.group(formDef);

        this.entityUrl = this.apiURL + this.formData.url;
        
        this.loadTasks();

    }

    private loadTasks(): void {
        this.http.get(this.entityUrl)
            .subscribe((res: Response) => {
                this.data = res.json();
            });
    }

    public delete(id: string): void {
        console.log('deleting ' + id);
        this.http.delete(this.entityUrl + '/' + id)
            .subscribe((res: Response) => {
                console.log(res.statusText);
                this.loadTasks();
            });
    }

}