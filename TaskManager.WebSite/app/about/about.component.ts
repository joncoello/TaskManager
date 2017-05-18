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
                <div id='my-wrapper'>
                </div>
                `
})
export class AboutComponent {
    public pageTitle: string = 'Examples';
    public loading: boolean = true;

    public theHtmlString: string = `
                <p class='my-style' onclick='paraClick()'>Hello</p>
                <style>
                    .my-style{
                        color: red;
                    }
                </style>
                <script>
                    function paraClick(){
                        alert('boo');
                    }
                </script>
    `;

    public onClick(): void {
        this.loading = !this.loading;
        var el = $('#my-wrapper');
        el.html(el.html() + this.theHtmlString);
        el.html(el.html() + this.theHtmlString);
    }

    onButtonClick() {
        this.pageTitle = 'Hello from Kendo UI!';
    }

}