/**
 * Created by Amit Thakkar on 02/05/15.
 */
(function (require) {
    var homeApp = require("./browserifyApp.home.js");
    homeApp.controller("HomeController", [function () {
        var homeController = this;
        homeController.page = "Home Page";
    }]);
})(require);