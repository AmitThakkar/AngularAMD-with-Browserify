/**
 * Created by Amit Thakkar on 02/05/15.
 */
(function (ng) {
    'use strict';
    var exports = module.exports;
    exports.moduleName = 'angular-amd.product';
    exports.module = ng.module(exports.moduleName);
    if (!exports.module) {
        exports.module = ng.module(exports.moduleName, []);
    }
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