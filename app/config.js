/**
 * Created by Amit Thakkar on 02/05/15.
 */
(function (require, module) {
    var MODULE_DELIMITER = '.';
    var MAIN_APP_MODULE = "angular-amd";
    var exports = module.exports;
    var externalModules = [
        'ui.router'
    ];
    require('angular-ui-router');
    var internalModules = [
        MAIN_APP_MODULE + MODULE_DELIMITER + 'home',
        MAIN_APP_MODULE + MODULE_DELIMITER + 'product'
    ];
    var internalModuleObjects = [
        require('./home/home.main.js')(internalModules[0]),
        require('./product/product.main.js')(internalModules[1])
    ];
    exports.dependModules = externalModules.concat(internalModules);
    exports.internalModuleObjects = internalModuleObjects;
    exports.mainAppModule = MAIN_APP_MODULE;
})(require, module);