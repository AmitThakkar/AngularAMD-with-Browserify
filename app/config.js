/**
 * Created by Amit Thakkar on 02/05/15.
 */
(function (require, module) {
    var mainAppModule = "angular-amd";
    var exports = module.exports;
    var externalModules = [
        'ui.router'
    ];
    require('angular-ui-router');
    var internalModules = [
        mainAppModule + '.home',
        mainAppModule + '.product'
    ];
    var internalModuleObjects = [
        require('./home/home.main.js'),
        require('./product/product.main.js')
    ];
    exports.dependModules = externalModules.concat(internalModules);
    exports.internalModuleObjects = internalModuleObjects;
    exports.mainAppModule = mainAppModule;
})(require, module);