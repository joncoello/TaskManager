/* tslint:disable:no-unused-variable */
import { HomeComponent } from "./app.homeComponent";

////////  SPECS  /////////////

describe("HomeComponent", function () {

    var sut: HomeComponent;

    beforeEach(() => {
        sut = new HomeComponent();
    });

    it("should create", () => {
        expect(sut instanceof HomeComponent).toBe(true, "should create AppComponent");
    });

    it("should start with the correct title", () => {
        expect(sut.pageTitle).toEqual("Home");
    });
});
