import { Component } from '@angular/core';

@Component({
    selector: 'grid',
    template: '<h2>{{pageTitle}}</h2>'
})
export class GridComponent {
    pageTitle: string = 'Grid';
}