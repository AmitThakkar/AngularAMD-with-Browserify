/**
 * Created by Amit Thakkar on 02/05/15.
 */
(function (ng, module) {
    'use strict';
    var exports = module.exports;
    exports.moduleName = 'angular-amd.home';
    try {
        exports.module = ng.module(exports.moduleName);
    } catch(e) {
        exports.module = ng.module(exports.moduleName, []);
    }
    exports.states = [
        {
            state: 'home',
            url: '/home',
            templateUrl: 'app/home/home.html',
            controller: 'HomeController',
            controllerAs: 'homeController',
            deps: ['build/home/home.controller.js']
        }
    ];
})(angular, module);