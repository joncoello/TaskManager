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
        this.toggleSidebar();
    }

    // open sidebar
    public toggleSidebar() {
        $('#wrapper').toggleClass('toggled');
    }

    public openSidebar() {
        $('#wrapper').addClass('toggled');
    }

    public closeSidebar() {
        $('#wrapper').removeClass('toggled');
    }

    public onResize() {
        this.updateSizing();
    }

    private isBreakpoint(alias: string): boolean {
        return $('.device-' + alias).is(':visible');
    }

    private updateSizing() { // isBreakpoint: (size: string) => boolean

        if (this.isBreakpoint('xs')) {

        }
        if (this.isBreakpoint('sm')) {

        }

        if (this.isBreakpoint('md')) {
            this.closeSidebar();
        }

        if (this.isBreakpoint('lg')) {
            this.openSidebar();
        }

    }

}