/**
 * Created by Amit Thakkar on 02/05/15.
 */
(function(ng, require) {
    module.exports = ng.module('browserifyApp.home', []);
    require("./HomeController.js");
})(angular, require);