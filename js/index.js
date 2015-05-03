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
    browserifyApp.config(['$stateProvider', function ($stateProvider) {
        ng.forEach(config.states, function (state) {
            if (state.deps) {
                if (!state.resolve) {
                    state.resolve = {};
                }
                state.resolve.deps = ['$q', function ($q) {
                    return loadDependencies($q, state.deps);
                }];
            }
            $stateProvider
                .state(state.state, state)
        });
    }]);
})(require);