/**
 * Created by Amit Thakkar on 02/05/15.
 */
(function (require) {
    'use strict';
    var productApp = require("./browserifyApp.product.js");
    productApp.controller("ProductController", [function () {
        var productController = this;
        productController.page = "Product Page";
    }]);
})(require);