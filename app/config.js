/**
 * Created by Amit Thakkar on 02/05/15.
 */
(function (require, module) {
    var exports = module.exports;
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
    exports.dependModules = externalModules.concat(internalModules);
    exports.internalModuleObjects = internalModuleObjects;
})(require, module);