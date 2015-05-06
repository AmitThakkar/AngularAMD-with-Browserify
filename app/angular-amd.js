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