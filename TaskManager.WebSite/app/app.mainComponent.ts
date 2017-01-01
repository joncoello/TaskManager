import { Component } from '@angular/core';

@Component({
    selector: 'main-app',
    template: `
    <h1>Task Manager</h1>
    <div>
        <nav>
            <ul>
                <li><a [routerLink]="['home']">Home</a></li>
                <li><a [routerLink]="['tasks']">Tasks</a></li>
            </ul>
        </nav>
    </div>
    <router-outlet></router-outlet>
    `
})
export class MainApp { }