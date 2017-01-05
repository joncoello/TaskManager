import { Component } from '@angular/core';

@Component({
    selector: 'task',
    template: '<h2>{{pageTitle}}</h2>'
})
export class TaskComponent {
    pageTitle: string = 'Task';
}