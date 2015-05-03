(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by Amit Thakkar on 02/05/15.
 */
(function (ng, require) {
    'use strict';
    var homeApp = ng.module("browserifyApp.home");
    require("./home.service");
    homeApp.controller("HomeController", ["HomeService", function (HomeService) {
        var homeController = this;
        homeController.page = "Home Page " + HomeService.getName();
    }]);
})(angular, require);
},{"./home.service":2}],2:[function(require,module,exports){
/**
 * Created by amitthakkar on 02/05/15.
 */
(function (ng) {
    'use strict';
    var homeApp = ng.module("browserifyApp.home");
    homeApp.service("HomeService", [function () {
        this.getName = function() {
            return "Home Service";
        };
    }]);
})(angular);
},{}]},{},[1]);
