/**
 * Created by Amit Thakkar on 01/05/15.
 */
(function (require) {
    'use strict';
    var ng = require('angular');
    var $script = require('scriptjs');
    var config = require('./config');

    var browserifyApp = ng.module('browserifyApp', config.modules);
    browserifyApp.controller('MainController', [function () {
        var mainController = this;
        mainController.mainPage = {
            title: 'Getting Started with Browserify'
        };
    }]);
    var load = function ($q, url) {
        var deferred = $q.defer();
        $script(url, function (error) {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve('Success');
            }
        });
        return deferred.promise;
    };
    browserifyApp.config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('product', {
                url: '/products',
                templateUrl: 'partials/products.html',
                controller: 'ProductController',
                controllerAs: 'productController',
                resolve: {
                    load: ['$q', function ($q) {
                        return load($q, 'build/product/product.controller.js');
                    }]
                }
            })
            .state('home', {
                url: '/home',
                templateUrl: 'partials/home.html',
                controller: 'HomeController',
                controllerAs: 'homeController',
                resolve: {
                    load: ['$q', function ($q) {
                        return load($q, 'build/home/home.controller.js');
                    }]
                }
            });
    }]);
})(require);