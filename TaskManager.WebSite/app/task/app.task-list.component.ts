import { Component } from "@angular/core";

import { Http, Response } from "@angular/http";

@Component({
    selector: "tasks",
    template: `
    <h1>{{title}}</h1>
    <ul>
       <li *ngFor="let item of data">
          <a [routerLink]="["task", item.id]">{{item.name}}</a>
       </li>
    </ul>
`
})

export class TaskListComponent {
    title: string;
    data: Object[];

    private helloUrl = "http://localhost:42992/api/hello";  // url to web API
    private tasksUrl = "http://localhost:42992/api/task";  // url to web API

    constructor(private http: Http) {
        this.title = "loading...";

        this.http.get(this.helloUrl)
            .subscribe((res: Response) => {
                this.title = res.json().message;
            });

        this.http.get(this.tasksUrl)
            .subscribe((res: Response) => {
                this.data = res.json();
            });
    }
}