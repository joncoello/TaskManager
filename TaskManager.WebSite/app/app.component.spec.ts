/* tslint:disable:no-unused-variable */
import { AppComponent } from './app.component';

////////  SPECS  /////////////

describe('AppComponent', function () {

    var sut: AppComponent;

    beforeEach(() => {
        sut = new AppComponent();
    });

    it('should create', () => {
        expect(sut instanceof AppComponent).toBe(true, 'should create AppComponent');
    });

    it('should start with the correct title', () => {
        expect(sut.pageTitle).toEqual('Task Manager');
    });
});
