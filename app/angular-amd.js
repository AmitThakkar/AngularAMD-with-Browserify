/**
 * Created by Amit Thakkar on 01/05/15.
 */
(function (require) {
    'use strict';
    var ng = require('angular');
    var $script = require('scriptjs');
    var config = require('./config');

    var addDynamicBehaviourSupportToModule = function (internalModule) {
        internalModule.config(['$controllerProvider', '$provide', '$compileProvider', function ($controllerProvider, $provide, $compileProvider) {
            internalModule.controller = function (name, constructor) {
                $controllerProvider.register(name, constructor);
                return (this);
            };
            internalModule.service = function (name, constructor) {
                $provide.service(name, constructor);
                return (this);
            };
            internalModule.factory = function (name, factory) {
                $provide.factory(name, factory);
                return (this);
            };
            internalModule.value = function (name, value) {
                $provide.value(name, value);
                return (this);
            };
            internalModule.constant = function (name, value) {
                $provide.constant(name, value);
                return (this);
            };
            internalModule.directive = function (name, factory) {
                $compileProvider.directive(name, factory);
                return (this);
            };
        }]);
    };
    var states = [];
    ng.forEach(config.internalModuleObjects, function (internalModuleObject) {
        states = states.concat(internalModuleObject.states);
        addDynamicBehaviourSupportToModule(internalModuleObject.module);
    });

    var angularAMD = ng.module('angular-amd', config.dependModules);
    angularAMD.config(['$stateProvider', function ($stateProvider) {
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