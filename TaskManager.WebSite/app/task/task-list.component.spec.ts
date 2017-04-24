/* tslint:disable:no-unused-variable */
import { inject, fakeAsync, tick, TestBed } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, ConnectionBackend, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { FormBuilder } from '@angular/forms';

import { TaskListComponent } from './task-list.component';
import { TaskService } from './task.service';

import { HttpClient } from '../shared/httpclient';

import { LoginService } from '../login/login.service';

////////  SPECS  /////////////

describe('TaskListComponent', function () {

    beforeEach(() => {

        TestBed.configureTestingModule({
            providers: [
                BaseRequestOptions,
                MockBackend,
                TaskListComponent,
                HttpClient,
                LoginService,
                {
                    provide: Http, useFactory: (backend: ConnectionBackend,
                        defaultOptions: BaseRequestOptions) => {
                        return new Http(backend, defaultOptions);
                    }, deps: [MockBackend, BaseRequestOptions]
                },
                FormBuilder,
                TaskService,
                { provide: 'API_URL', useValue: 'http://jctaskmanagerapi.azurewebsites.net' }
            ]
        });
    });

    it('should create',
        inject([TaskListComponent], fakeAsync((taskListComponent: TaskListComponent) => {

            expect(taskListComponent instanceof TaskListComponent).toBe(true, 'should create TaskListComponent');

            expect(taskListComponent.title).toBe('tasks');

        }))
    );
});
