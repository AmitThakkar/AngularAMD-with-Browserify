/**
 * Created by Amit Thakkar on 02/05/15.
 */
(function (ng) {
    var homeApp = ng.module('browserifyApp.home');
    homeApp.controller("HomeController", [function () {
        var homeController = this;
        homeController.page = "Home Page";
    }]);
})(angular);