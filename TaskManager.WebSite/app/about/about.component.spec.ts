/* tslint:disable:no-unused-variable */
import { AboutComponent } from './about.component';

////////  SPECS  /////////////

describe('AboutComponent', function () {

    var sut: AboutComponent;

    beforeEach(() => {
        sut = new AboutComponent();
    });

    it('should create', () => {
        expect(sut instanceof AboutComponent).toBe(true, 'should create AppComponent');
    });

    it('should start with the correct title', () => {
        expect(sut.pageTitle).toEqual('Examples');
    });
});
