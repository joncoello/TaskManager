/* tslint:disable:no-unused-variable */
import { inject, fakeAsync, tick, TestBed } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, ConnectionBackend, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';

import { TaskListComponent } from './app.task-list.component';

////////  SPECS  /////////////

describe('TaskListComponent', function () {
    
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
        
    });

    it('should create', 
        inject([TaskListComponent], fakeAsync((taskListComponent: TaskListComponent) => {

            expect(taskListComponent instanceof TaskListComponent).toBe(true, 'should create AppComponent');

            expect(taskListComponent.title).toBe('loading...');

        }))
    );
    
});
