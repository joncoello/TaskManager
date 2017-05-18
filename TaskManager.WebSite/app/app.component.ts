/* tslint:disable:no-any */

import { Component } from '@angular/core';

@Component({
    selector: 'main-app',
    templateUrl: './app/app.component.html'
})
export class AppComponent {
    public pageTitle: string = 'Task Manager';

    // collapse nav bar on navigate
    public beforeNav() {
        console.log('before nav');
        var navBar: any = $('.navbar-collapse');
        navBar.collapse('hide');
    }

}