/**
 * Created by Amit Thakkar on 02/05/15.
 */
(function (require, module) {
    var MAIN_APP_MODULE = "angular-amd";
    var exports = module.exports;
    var externalModules = [
        'ui.router'
    ];
    require('angular-ui-router');
    var homeApp = require('./home/home.main.js');
    var productApp = require('./product/product.main.js');
    var internalModules = [
        homeApp.moduleName,
        productApp.moduleName
    ];
    var internalModuleObjects = [
        homeApp,
        productApp
    ];
    exports.dependModules = externalModules.concat(internalModules);
    exports.internalModuleObjects = internalModuleObjects;
    exports.mainAppModule = MAIN_APP_MODULE;
})(require, module);