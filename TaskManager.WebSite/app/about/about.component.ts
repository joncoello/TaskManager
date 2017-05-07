import { Component } from '@angular/core';

@Component({
    selector: 'about',
    template:   `
                <h2>{{pageTitle}}</h2>

                <h3>transclusion example</h3>
                <button (click)='onClick()'>click me</button>
                parent {{loading}}
                <wrapper-example [isLoading]='loading'>
                    this is a test
                </wrapper-example>
                <button kendoButton (click)="onButtonClick()" [primary]="true">My Kendo UI Button</button>
                `
})
export class AboutComponent {
    public pageTitle: string = 'Examples';
    public loading: boolean = true;

    public onClick(): void {
        this.loading = !this.loading;
    }

    onButtonClick() {
        this.pageTitle = 'Hello from Kendo UI!';
    }

}