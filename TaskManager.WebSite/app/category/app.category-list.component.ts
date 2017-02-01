import { Component } from '@angular/core';

@Component({
    selector: 'category',
    template: '<h2>{{pageTitle}}</h2>'
})
export class CategoryListComponent {
    pageTitle: string = 'Categories';
}