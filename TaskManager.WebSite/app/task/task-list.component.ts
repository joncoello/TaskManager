import { Component, OnInit } from '@angular/core';

import { Response } from '@angular/http';

import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { TaskService } from './task.service';

import { TaskItem, TaskListViewModel } from './task.model';

@Component({
    selector: 'tasks',
    templateUrl: './app/task/task-list.component.html'
})

export class TaskListComponent implements OnInit {
    public title: string;
    public data: TaskListViewModel[];
    public addTaskForm: FormGroup;
    public addTaskNameField: FormControl;
    public isLoading: boolean = false;
    public isAdding: boolean = false;

    constructor(private fb: FormBuilder, private taskService: TaskService) {
        this.title = 'tasks';
    }

    public ngOnInit() {
        this.addTaskNameField = new FormControl('');
        this.addTaskForm = this.fb.group({
            'taskName': this.addTaskNameField
        });

        this.isLoading = true;
        this.loadTasks();
    }

    public onSubmit(task: TaskItem): void {
        this.addTaskNameField.setValue('');
        console.log('you submitted value:', task);
        this.isAdding = true;
        this.taskService.createTask(task)
            .subscribe((res: Response) => {
                console.log(res.statusText);
                this.isAdding = false;
                this.loadTasks();
            });
    }

    public loadTasks() {
        this.taskService.getTasks()
            .subscribe((tasks: TaskListViewModel[]) => {
                this.data = tasks;
                this.isLoading = false;
            });
    }

    public deleteTask(taskID: string) {
        this.isAdding = true;
        this.taskService.deleteTask(taskID)
            .subscribe((res: Response) => {
                this.isAdding = false;
                this.loadTasks();
            });
    }

}