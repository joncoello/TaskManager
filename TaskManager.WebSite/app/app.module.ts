import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }      from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';

import { MainApp } from './app.mainComponent';
import { HomeComponent } from './app.homeComponent';
import { TaskListComponent }  from './app.taskListComponent';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'tasks', component: TaskListComponent }
];

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        RouterModule.forRoot(routes)
    ],
    declarations: [
        MainApp,
        TaskListComponent,
        HomeComponent
    ],
    bootstrap: [MainApp],
    providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
    ]
})
export class AppModule { }