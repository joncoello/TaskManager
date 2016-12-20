import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TaskListComponent }  from './app.taskListComponent';

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [TaskListComponent],
    bootstrap: [TaskListComponent]
})
export class AppModule { }