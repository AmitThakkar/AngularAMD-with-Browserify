/**
 * Created by Amit Thakkar on 03/05/15.
 */
describe('Home module test cases', function () {
    var homeController,
        scope;
    beforeEach(angular.mock.module("browserifyApp.home"));
    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        homeController = $controller('HomeController', {
            $scope: scope
        });
    }));
    it('says hello world!', function () {
        expect(homeController.page).toEqual('Home Page Home Service');
    });
});