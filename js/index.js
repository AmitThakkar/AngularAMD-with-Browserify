/**
 * Created by Amit Thakkar on 01/05/15.
 */
(function (require) {
    'use strict';
    var ng = require('angular');
    require('angular-ui-router');
    var $script = require("scriptjs");
    var modules = [];
    modules.push(require("./home/browserifyApp.home.js"));
    modules.push(require("./product/browserifyApp.product.js"));
    ng.forEach(modules, function (module) {
        module.config(function ($controllerProvider) {
            module.controller = function (name, constructor) {
                $controllerProvider.register(name, constructor);
                return (this);
            };
        });
    });

    var browserifyApp = ng.module('browserifyApp', ['ui.router', 'browserifyApp.home', "browserifyApp.product"]);
    browserifyApp.controller("MainController", [function () {
        var mainController = this;
        mainController.mainPage = {
            title: "Getting Started with Browserify"
        };
    }]);
    browserifyApp.config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('product', {
                url: '/products',
                templateUrl: 'partials/products.html',
                controller: "ProductController",
                controllerAs: 'productController',
                resolve: {}
            })
            .state('home', {
                url: '/home',
                templateUrl: 'partials/home.html',
                controller: "HomeController",
                controllerAs: 'homeController',
                resolve: {}
            });
    }]);
    $script("build/home/HomeController.js", function (error) {
    });
    $script("build/product/ProductController.js", function (error) {
    });
})(require);