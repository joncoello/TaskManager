import { Component } from '@angular/core';

import { Http, Response } from '@angular/http';

import { Observable }     from 'rxjs/Observable';

@Component({
    selector: 'my-app',
    template: '<h1>{{title}}</h1>'
})
export class TaskListComponent {
    title: string;
    data: Object;

    private heroesUrl = 'http://localhost:42992/api/hello';  // URL to web API

    constructor(private http: Http) {
        this.title = "loading...";

        this.http.get(this.heroesUrl)
            .subscribe((res: Response) => {
                this.title = res.json().message;
            });
    }
}