﻿import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'task',
    template: '<h2>{{pageTitle}}</h2>'
})
export class TaskComponent {
    pageTitle: string = 'Task';

    constructor(private route: ActivatedRoute) {
        route.params.subscribe(params => {
            this.pageTitle = params['id'];
        });
    }

}