/**
 * Created by Amit Thakkar on 02/05/15.
 */
(function (ng, module) {
    'use strict';
    var exports = module.exports;
    exports.moduleName = 'angular-amd.home';
    exports.module = ng.module(exports.moduleName);
    if(!exports.module) {
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