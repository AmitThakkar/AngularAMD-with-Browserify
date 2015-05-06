/**
 * Created by Amit Thakkar on 02/05/15.
 */
(function (ng) {
    'use strict';
    var exports = module.exports;
    exports.module = ng.module('angular-amd.product', []);
    exports.states = [
        {
            state: 'product',
            url: '/products',
            templateUrl: 'app/product/products.html',
            controller: 'ProductController',
            controllerAs: 'productController',
            deps: ['build/product/product.controller.js']
        }
    ];
})(angular);