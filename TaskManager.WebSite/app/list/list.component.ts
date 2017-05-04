import { Component } from '@angular/core';

@Component({
    selector: 'list',
    template: `
                <h2>{{pageTitle}}</h2>
                `
})
export class ListComponent {
    public pageTitle: string = 'list';
}