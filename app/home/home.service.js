/**
 * Created by amitthakkar on 02/05/15.
 */
(function (ng) {
    'use strict';
    var homeApp = ng.module("angular-amd.home");
    homeApp.service("HomeService", [function () {
        this.getName = function() {
            return "Home Service";
        };
    }]);
})(angular);