import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpModule }      from '@angular/http';

import { TaskListComponent }  from './app.taskListComponent';

@NgModule({
    imports: [
        BrowserModule, HttpModule
    ],
    declarations: [TaskListComponent],
    bootstrap: [TaskListComponent]
})
export class AppModule { }