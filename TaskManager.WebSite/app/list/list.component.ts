import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '../shared/httpclient';
import { Response } from '@angular/http';

@Component({
    selector: 'list',
    templateUrl: './app/list/list.component.html'
})
export class ListComponent implements OnInit {
    public pageTitle: string = 'list';
    public formData: any;
    public data: any;

    public newData: any = {};

    private entityUrl: string;

    constructor(private http: HttpClient, @Inject('API_URL') private apiURL: string) {

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

        this.entityUrl = this.apiURL + this.formData.url;

        this.loadTasks();

    }

    private loadTasks(): void {
        this.newData = {};
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

    public onSubmit(data: any): void {
        console.log('adding ' + data);
        this.http.post(this.entityUrl, data)
            .subscribe((res: Response) => {
                console.log(res.statusText);
                this.loadTasks();
            });
    }

}