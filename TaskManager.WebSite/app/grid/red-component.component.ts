import { Component } from '@angular/core';

@Component({
    selector: 'app-red-component',
    template: '<span style="color: red">{{ params.value }}</span>'
})
export class RedComponentComponent {
    private params: any;

    public agInit(params: any): void {
        this.params = params;
    }
}