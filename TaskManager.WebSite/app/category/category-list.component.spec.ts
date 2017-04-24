/* tslint:disable:no-unused-variable */
import { inject, fakeAsync, tick, TestBed } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, ConnectionBackend, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { FormBuilder } from '@angular/forms';

import { CategoryListComponent } from './category-list.component';

import { HttpClient } from '../shared/httpclient';

import { LoginService } from '../login/login.service';

////////  SPECS  /////////////

describe('CategoryListComponent', function () {

    beforeEach(() => {

        TestBed.configureTestingModule({
            providers: [
                BaseRequestOptions,
                MockBackend,
                CategoryListComponent,
                HttpClient,
                LoginService,
                {
                    provide: Http, useFactory: (backend: ConnectionBackend,
                        defaultOptions: BaseRequestOptions) => {
                        return new Http(backend, defaultOptions);
                    }, deps: [MockBackend, BaseRequestOptions]
                },
                FormBuilder,
                { provide: 'API_URL', useValue: 'http://jctaskmanagerapi.azurewebsites.net' }
            ]
        });
    });

    it('should create',
        inject([CategoryListComponent], fakeAsync((taskListComponent: CategoryListComponent) => {

            expect(taskListComponent instanceof CategoryListComponent).toBe(true, 'should create CategoryListComponent');

            expect(taskListComponent.pageTitle).toBe('categories');

        }))
    );

});
