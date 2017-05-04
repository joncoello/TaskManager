// entry point module

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }      from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular/main';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TaskListComponent }  from './task/task-list.component';
import { TaskComponent } from './task/task.component';
import { TaskService } from './task/task.service';
import { CategoryListComponent } from './category/category-list.component';
import { AboutComponent } from './about/about.component';
import { GridComponent } from './grid/grid.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { GridService } from './grid/grid.service';
import { RedComponentComponent } from './grid/red-component.component';
import { ListComponent } from './list/list.component';

import { LoggedInGuard } from './guards/login.guard';

import { ChartsModule } from 'ng2-charts';

// shared
import { HttpClient } from './shared/httpclient';
import { WrapperExampleComponent } from './shared/wrapper.example';

import { AppSettings } from './environments/environment';

// need to move this to its own module
// clarify lazy loading approach
const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, canActivate: [LoggedInGuard] },
    { path: 'tasks', component: TaskListComponent, canActivate: [LoggedInGuard] },
    { path: 'tasks/:category', component: TaskListComponent, canActivate: [LoggedInGuard] },
    { path: 'tasks/task/:id', component: TaskComponent, canActivate: [LoggedInGuard] },
    { path: 'categories', component: CategoryListComponent, canActivate: [LoggedInGuard] },
    { path: 'about', component: AboutComponent, canActivate: [LoggedInGuard]  },
    { path: 'grid', component: GridComponent, canActivate: [LoggedInGuard] },
    { path: 'list/:id', component: ListComponent, canActivate: [LoggedInGuard] },
    { path: 'login', component: LoginComponent }
];

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        RouterModule.forRoot(routes),
        FormsModule,
        ReactiveFormsModule,
        ChartsModule,
        AgGridModule.withComponents(
            [RedComponentComponent]
        )
    ],
    declarations: [
        AppComponent,
        TaskListComponent,
        TaskComponent,
        HomeComponent,
        CategoryListComponent,
        AboutComponent,
        GridComponent,
        LoginComponent,
        RedComponentComponent,
        ListComponent,
        WrapperExampleComponent
    ],
    bootstrap: [AppComponent],
    providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        TaskService,
        GridService,
        LoginService,
        LoggedInGuard,
        HttpClient,
        { provide: 'API_URL', useValue: AppSettings.baseUrl }
    ]
})
export class AppModule { }