// entry point module

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }      from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/app.homeComponent';
import { TaskListComponent }  from './task/task-list.component';
import { TaskComponent } from './task/task.component';
import { TaskService } from './task/task.service';
import { CategoryListComponent } from './category/category-list.component';
import { AboutComponent } from './about/about.component';
import { GridComponent } from './grid/grid.component';
import { GridService } from './grid/grid.service';

import { ChartsModule } from 'ng2-charts';

// need to move this to its own module
// clarify lazy loading approach
const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'tasks', component: TaskListComponent },
    { path: 'tasks/task/:id', component: TaskComponent },
    { path: 'categories', component: CategoryListComponent },
    { path: 'about', component: AboutComponent },
    { path: 'grid', component: GridComponent }
];

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        RouterModule.forRoot(routes),
        FormsModule,
        ReactiveFormsModule,
        ChartsModule
    ],
    declarations: [
        AppComponent,
        TaskListComponent,
        TaskComponent,
        HomeComponent,
        CategoryListComponent,
        AboutComponent,
        GridComponent
    ],
    bootstrap: [AppComponent],
    providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        TaskService,
        GridService,
        { provide: 'API_URL', useValue: 'http://jctaskmanagerapi.azurewebsites.net'}
    ]
})
export class AppModule { }