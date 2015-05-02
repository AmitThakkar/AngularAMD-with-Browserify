/**
 * Created by Amit Thakkar on 02/05/15.
 */
(function (ng) {
    var productApp = ng.module('browserifyApp.product');
    productApp.controller("ProductController", [function () {
        var productController = this;
        productController.page = "Product Page";
    }]);
})(angular);