/**
 * Created by Amit Thakkar on 02/05/15.
 */
(function(ng, require) {
    'use strict';
    var homeApp = module.exports = ng.module('browserifyApp.home', []);
    homeApp.config(function($controllerProvider) {
        homeApp._controller = homeApp.controller;
        homeApp.controller = function (name, constructor) {
            $controllerProvider.register(name, constructor);
            return (this);
        };
    });
})(angular, require);