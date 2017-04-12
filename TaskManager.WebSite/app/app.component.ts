import { Component } from '@angular/core';

@Component({
    selector: 'main-app',
    template: `
    <div>
        <nav class='navbar navbar-default'>
            <div class='container-fluid'>
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header">
                  <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                  </button>
                  <a class="navbar-brand" href="/">{{pageTitle}}</a>
                </div>
                <div class="collapse navbar-collapse">
                    <ul class='nav navbar-nav'>
                        <li><a [routerLink]="['home']">Home</a></li>
                        <li><a [routerLink]="['tasks']">Tasks</a></li>
                        <li><a [routerLink]="['categories']">Categories</a></li>
                        <li><a [routerLink]="['about']">About</a></li>
                        <li><a [routerLink]="['grid']">Grid</a></li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class='container'>
            <router-outlet></router-outlet>
        </div>
     </div>
    `
})
export class AppComponent {
    pageTitle: string = 'Task Manager';
}