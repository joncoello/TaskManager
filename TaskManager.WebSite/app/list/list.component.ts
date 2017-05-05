import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '../shared/httpclient';
import { Response } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'list',
    templateUrl: './app/list/list.component.html'
})
export class ListComponent implements OnInit {
    public pageTitle: string = 'list';
    public formData: any;
    public vm: any;
    public newData: any = {};
    public isLoading: boolean = true;

    private entityUrl: string;

    constructor(private http: HttpClient, @Inject('API_URL') private apiURL: string, private route: ActivatedRoute) {

    }

    public ngOnInit(): void {

        this.route.params.subscribe((params: { [key: string]: any }) => {

            var id = params['id'];
            console.log('id is ' + id);

            // meta data
            this.http.get(this.apiURL + '/api/list/' + id)
                .subscribe((res: Response) => {
                    console.log(res.statusText);

                    this.formData = res.json();
                    
                    this.entityUrl = this.apiURL + this.formData.url;

                    this.loadTasks();

                });
            
        });

    }

    private loadTasks(): void {
        this.newData = {};
        this.http.get(this.entityUrl)
            .subscribe((res: Response) => {
                this.vm = res.json();
                this.isLoading = false;
            });
    }

    public edit(data: any): void {
        data.isEdit = true;
    }

    public delete(data: any): void {
        var id = data[this.formData.idField];
        console.log('deleting ' + id);
        this.http.delete(this.entityUrl + '/' + id)
            .subscribe((res: Response) => {
                console.log(res.statusText);
                this.loadTasks();
            });
    }

    public save(data: any): void {
        console.log('saving');
        console.log(data);
        this.http.patch(this.entityUrl, data)
            .subscribe((res: Response) => {
                console.log(res.statusText);
                this.loadTasks();
            });
        data.isEdit = false;
    }

    public onSubmit(data: any): void {
        console.log('adding');
        console.log(data);
        this.http.post(this.entityUrl, data)
            .subscribe((res: Response) => {
                console.log(res.statusText);
                this.loadTasks();
            });
    }

}