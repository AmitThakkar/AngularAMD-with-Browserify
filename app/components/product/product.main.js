/**
 * Created by Amit Thakkar on 02/05/15.
 */
(function (ng) {
    'use strict';
    var exports = module.exports;
    exports.moduleName = 'angular-amd.product';
    try {
        exports.module = ng.module(exports.moduleName);
    } catch(e) {
        exports.module = ng.module(exports.moduleName, []);
    }
    exports.routes = [
        {
            url: '/products',
            templateUrl: 'components/product/_product.html',
            controller: 'ProductController',
            controllerAs: 'productController',
            deps: ['components/product/product.controller.js']
        }
    ];
})(angular);