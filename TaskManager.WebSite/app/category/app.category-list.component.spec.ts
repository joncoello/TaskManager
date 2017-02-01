/* tslint:disable:no-unused-variable */
import { CategoryListComponent } from './app.category-list.component';

////////  SPECS  /////////////

describe('CategoryListComponent', function () {

    var sut: CategoryListComponent;

    beforeEach(() => {
        sut = new CategoryListComponent();
    });

    it('should create', () => {
        expect(sut instanceof CategoryListComponent).toBe(true, 'should create CategoryListComponent');
    });

    it('should start with the correct title', () => {
        expect(sut.pageTitle).toEqual('Categories');
    });
});
