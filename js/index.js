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
        module.config(["$controllerProvider", "$provide", "$compileProvider",
            function ($controllerProvider, $provide, $compileProvider) {
                module.controller = function (name, constructor) {
                    $controllerProvider.register(name, constructor);
                    return (this);
                };
                module.service = function (name, constructor) {
                    $provide.service(name, constructor);
                    return (this);
                };
                module.factory = function (name, factory) {
                    $provide.factory(name, factory);
                    return (this);
                };
                module.value = function (name, value) {
                    $provide.value(name, value);
                    return (this);
                };
                module.directive = function (name, factory) {
                    $compileProvider.directive(name, factory);
                    return (this);
                };
            }]);
    });
    var browserifyApp = ng.module('browserifyApp', ['ui.router', 'browserifyApp.home', "browserifyApp.product"]);
    browserifyApp.controller("MainController", [function () {
        var mainController = this;
        mainController.mainPage = {
            title: "Getting Started with Browserify"
        };
    }]);
    var load = function ($q, url) {
        var deferred = $q.defer();
        $script(url, function (error) {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve("Success");
            }
        });
        return deferred.promise;
    };
    browserifyApp.config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('product', {
                url: '/products',
                templateUrl: 'partials/products.html',
                controller: "ProductController",
                controllerAs: 'productController',
                resolve: {
                    load: ["$q", function ($q) {
                        return load($q, "build/product/ProductController.js");
                    }]
                }
            })
            .state('home', {
                url: '/home',
                templateUrl: 'partials/home.html',
                controller: "HomeController",
                controllerAs: 'homeController',
                resolve: {
                    load: ["$q", function ($q) {
                        return load($q, "build/home/HomeController.js");
                    }]
                }
            });
    }]);
})(require);