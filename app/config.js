/**
 * Created by Amit Thakkar on 02/05/15.
 */
(function (ng, require, module) {
    var externalModules = [
        'ui.router'
    ];
    require('angular-ui-router');
    var internalModules = [
        'browserifyApp.home',
        'browserifyApp.product'
    ];
    var internalModuleObjects = [
        require('./home/home.main.js'),
        require('./product/product.main.js')
    ];
    var exports = module.exports;
    exports.dependModules = externalModules.concat(internalModules);
    exports.internalModuleObjects = internalModuleObjects;
})(angular, require, module);