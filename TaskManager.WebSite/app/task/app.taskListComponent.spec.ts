/* tslint:disable:no-unused-variable */
import { inject, fakeAsync, tick, TestBed } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, ConnectionBackend, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';

import { TaskListComponent } from './app.taskListComponent';

////////  SPECS  /////////////

describe('TaskListComponent', function () {

    //var sut: TaskListComponent;
    
    beforeEach(() => {

        TestBed.configureTestingModule({
            providers: [
                BaseRequestOptions,
                MockBackend,
                TaskListComponent,
                {
                    provide: Http, useFactory: (backend: ConnectionBackend,
                        defaultOptions: BaseRequestOptions) => {
                        return new Http(backend, defaultOptions);
                    }, deps: [MockBackend, BaseRequestOptions]
                }
            ]
        });

        //sut = new TaskListComponent();
    });

    it('should create', () => {

        inject([TaskListComponent], fakeAsync((taskListComponent: TaskListComponent) => {
            expect(taskListComponent instanceof TaskListComponent).toBe(true, 'should create AppComponent');
        }));
        
    });

    //it('should start with the correct title', () => {
    //    expect(sut.pageTitle).toEqual('Task Manager');
    //});
});
