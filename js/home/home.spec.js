/**
 * Created by Amit Thakkar on 03/05/15.
 */
describe("Home: Testing Modules", function () {
    describe("App Module:", function () {

        var module;
        beforeEach(function () {
            module = angular.module("browserifyApp.home");
        });

        it("should be registered", function () {
            console.log(module);
            expect(module).not.to.equal(null);
        });
    });
});