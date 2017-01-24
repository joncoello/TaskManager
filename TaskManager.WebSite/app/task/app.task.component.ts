/* tslint:disable:no-string-literal */
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'task',
    template: `
        <h2>{{pageTitle}}</h2>
        <form   [formGroup]="myForm"
                (ngSubmit)="onSubmit(myForm.value)">
            <div>
                <label for="skuInput">SKU</label>
                <input  type="text"
                        id="skuInput"
                        placeholder="SKU"
                        [formControl]="myForm.controls['sku']">
            </div>
            <button type="submit">Submit</button>
        </form>
    `
})
export class TaskComponent {
    pageTitle: string = 'Task';
    myForm: FormGroup;

    constructor(private route: ActivatedRoute, fb: FormBuilder) {
        route.params.subscribe((params: {[key: string] : any}) => {
            this.pageTitle = params['id'];
        });

        this.myForm = fb.group({
            'sku': ['ABC123']
        });

    }

    onSubmit(form: any): void {
        console.log('you submitted value:', form);
    }

}