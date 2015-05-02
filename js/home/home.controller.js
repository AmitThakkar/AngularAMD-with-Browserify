/**
 * Created by Amit Thakkar on 02/05/15.
 */
(function (ng, require) {
    'use strict';
    var homeApp = ng.module("browserifyApp.home");
    require("./home.service");
    homeApp.controller("HomeController", ["HomeService", function (HomeService) {
        var homeController = this;
        homeController.page = "Home Page " + HomeService.getName();
    }]);
})(angular, require);