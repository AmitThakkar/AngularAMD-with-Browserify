/**
 * Created by Amit Thakkar on 02/05/15.
 */
(function (ng, require) {
    'use strict';
    var homeApp = ng.module('browserifyApp.home');
    require('./home.service');
    homeApp.controller('HomeController', ['HomeService', '$scope', function (HomeService, $scope) {
        var homeController = this;
        homeController.page = 'Home Page ' + HomeService.getName();
        $scope.name = 'Amit Thakkar';
    }]);
})(angular, require);