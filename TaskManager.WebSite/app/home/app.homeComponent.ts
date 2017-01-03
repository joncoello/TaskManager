import { Component } from '@angular/core';

@Component({
    selector: 'home',
    template: '<h2>{{pageTitle}}</h2>'
})
export class HomeComponent {
    pageTitle: string = 'Task Manager';
}