import { Component } from '@angular/core';

@Component({
    selector: 'about',
    template:   `
                <h2>{{pageTitle}}</h2>

                <h3>transclusion example</h3>
                <wrapper-example>
                    this is a test
                </wrapper-example>
                `
})
export class AboutComponent {
    public pageTitle: string = 'Examples';
}