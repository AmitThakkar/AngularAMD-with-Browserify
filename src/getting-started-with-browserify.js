(function(ng) {
    'use strict';
    var gettingStartedWithBrowserify = ng.module('gettingStartedWithBrowserify', ['ui.router']);
    gettingStartedWithBrowserify.controller("MainController", [function () {
        var mainController = this;
        mainController.mainPage = {
            title: "Getting Started with Browserify"
        };
    }]);
    gettingStartedWithBrowserify.controller("HomeController", [function() {
        var homeController = this;
        homeController.page = "Home Page";
    }]);
    gettingStartedWithBrowserify.controller("ProductController", [function() {
        var productController = this;
        productController.page = "Product Page";
    }]);
    gettingStartedWithBrowserify.config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('product', {
                    url: '/products',
                    templateUrl: 'partials/products.html',
                    controllerAs: 'productController',
                    controller: "ProductController"
                })
                .state('home', {
                    url: '/home',
                    templateUrl: 'partials/home.html',
                    controllerAs: 'homeController',
                    controller: "HomeController"
                });
        }]);
})(angular);