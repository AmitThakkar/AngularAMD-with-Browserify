/**
 * Created by Amit Thakkar on 02/05/15.
 */
(function (ng) {
    'use strict';
    var productApp = ng.module(require('./product.main').moduleName);
    productApp.controller("ProductController", [function () {
        var productController = this;
        productController.page = "Product Page";
    }]);
})(angular);