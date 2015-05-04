/**
 * Created by Amit Thakkar on 01/05/15.
 */
(function (require) {
    'use strict';
    var ng = require('angular');
    var $script = require('scriptjs');
    var config = require('./config');

    var addDynamicBehaviourSupportToModule = require("./dynamicBehaviour");
    var states = [];
    ng.forEach(config.internalModuleObjects, function (internalModuleObject) {
        states = states.concat(internalModuleObject.states);
        addDynamicBehaviourSupportToModule(internalModuleObject.module);
    });

    var browserifyApp = ng.module('browserifyApp', config.dependModules);
    browserifyApp.controller('MainController', [function () {
        var mainController = this;
        mainController.title = 'Getting Started with Browserify';
    }]);
    browserifyApp.config(['$stateProvider', function ($stateProvider) {
        var loadDependencies = function ($q, deps) {
            var deferred = $q.defer();
            $script(deps, function (error) {
                if (error) {
                    deferred.reject(error);
                } else {
                    deferred.resolve('Success');
                }
            });
            return deferred.promise;
        };
        ng.forEach(states, function (state) {
            if (state.deps) {
                if (!state.resolve) {
                    state.resolve = {};
                }
                state.resolve.deps = ['$q', function ($q) {
                    return loadDependencies($q, state.deps);
                }];
            }
            $stateProvider.state(state.state, state)
        });
    }]);
})(require);