/* tslint:disable:no-string-literal */
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'task',
    template: `
        
        <form   id="taskEdit"
                [formGroup]="myForm"
                (ngSubmit)="onSubmit(myForm.value)">
            <div class="form-group">
                <label>ID</label>
                <label class="form-control">{{pageTitle}}</label>
            </div>
            <div class="form-group">
                <label for="skuInput">Name</label>
                <input  class="form-control"
                        type="text"
                        id="skuInput"
                        placeholder="Name"
                        [formControl]="myForm.controls['sku']">
            </div>
            <div class="form-group">       
                <!--<textarea class="multi-line-text" placeholder="What's up?" required></textarea>-->
                <label for="body">Body</label>
                <textarea id="body" class="form-control" placeholder="Description" required></textarea>
            </div>
            <button class="btn btn-primary" type="submit">Submit</button>
        </form>
    `
})
export class TaskComponent {
    pageTitle: string = 'Task';
    myForm: FormGroup;

    constructor(private route: ActivatedRoute, fb: FormBuilder) {
        this.myForm = fb.group({
            'sku': ['ABC123']
        });

        route.params.subscribe((params: { [key: string]: any }) => {
            this.pageTitle = params['id'];
        });

        

    }

    onSubmit(form: any): void {
        console.log('you submitted value:', form);
    }

}