import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
    private categoryToFilter: string;

    constructor(private fb: FormBuilder, private taskService: TaskService, private route: ActivatedRoute) {
        this.title = 'tasks';
    }

    public ngOnInit() {
        this.addTaskNameField = new FormControl('');
        this.addTaskForm = this.fb.group({
            'taskName': this.addTaskNameField
        });

        this.route.params.subscribe((params: { [key: string]: any }) => {
            this.categoryToFilter = params['category'];
            
            this.isLoading = true;
            this.loadTasks();
        });
    }

    public onSubmit(task: TaskItem): void {
        this.addTaskNameField.setValue('');
        console.log('you submitted value:', task);
        this.taskService.createTask(task)
            .subscribe((res: Response) => {
                console.log(res.statusText);
                this.loadTasks();
            });
    }

    public loadTasks() {
        this.taskService.getTasks(this.categoryToFilter)
            .subscribe((tasks: TaskListViewModel[]) => {
                this.data = tasks;
                this.isLoading = false;
            });
    }

    public deleteTask(taskID: string) {
        this.taskService.deleteTask(taskID)
            .subscribe((res: Response) => {
                this.data.forEach((tlvm: TaskListViewModel) => {
                    var taskToDelete = tlvm.tasks.find((t: TaskItem) => t.taskItemID === taskID);
                    if (taskToDelete !== undefined) {
                        tlvm.tasks.splice(tlvm.tasks.indexOf(taskToDelete), 1);
                    }
                });
            });
    }

}