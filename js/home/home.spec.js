/**
 * Created by Amit Thakkar on 03/05/15.
 */
describe('Home module test cases', function () {
    var HomeController,
        scope;
    beforeEach(angular.mock.module("browserifyApp.home"));
    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        HomeController = $controller('HomeController', {
            $scope: scope
        });
    }));
    it('says hello world!', function () {
        expect(scope.name).toEqual('Amit Thakkar');
    });
});