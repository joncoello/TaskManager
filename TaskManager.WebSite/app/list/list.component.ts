import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '../shared/httpclient';
import { Response } from '@angular/http';

@Component({
    selector: 'list',
    template: `
                <h2>{{pageTitle}}</h2>
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <td *ngFor='let field of formData.fields'>
                                {{field.id}}
                            </td>
                        </tr>
                    </thead>
                    <tr *ngFor='let item of data'>
                        <td *ngFor='let field of formData.fields'>
                            {{item[field.id]}}
                        </td>
                        <td>
                            <a class="btn btn-danger btn-xs delete-button"
                               (click)="delete(item[formData.idField])">
                                <i class="fa fa-trash-o fa-sm"></i>
                            </a>
                        </td>
                    </tr>
                </table>
                `
})
export class ListComponent implements OnInit {
    public pageTitle: string = 'list';
    public formData: any;
    public data: any;

    private entityUrl: string;

    constructor(private http: HttpClient, @Inject('API_URL') private apiURL: string) {

    }

    public ngOnInit(): void {

        this.formData = {
            idField: 'taskCategoryID',
            fields: [
                { id: 'categoryName' }
            ],
            url: '/api/category'
        };

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