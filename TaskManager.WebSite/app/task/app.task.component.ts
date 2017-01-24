/* tslint:disable:no-string-literal */
import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'task',
    template: `
        <h2>{{pageTitle}}</h2>
        <form   #f="ngForm"
                (ngSubmit)="onSubmit(f.value)">
            <div>
                <label for="skuInput">SKU</label>
                <input  type="text"
                        id="skuInput"
                        placeholder="SKU"
                        name="sku" ngModel>
            </div>
            <button type="submit">Submit</button>
        </form>
    `
})
export class TaskComponent {
    pageTitle: string = 'Task';

    constructor(private route: ActivatedRoute) {
        route.params.subscribe((params: {[key: string] : any}) => {
            this.pageTitle = params['id'];
        });
    }

    onSubmit(form: any): void {
        console.log('you submitted value:', form);
    }

}