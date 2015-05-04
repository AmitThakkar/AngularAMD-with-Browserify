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
    var addDynamicBehaviourSupportToModule = require("./dynamicBehaviour");
    var states = [];
    ng.forEach(internalModuleObjects, function (internalModuleObject) {
        states = states.concat(internalModuleObject.states);
        addDynamicBehaviourSupportToModule(internalModuleObject.module);
    });
    var exports = module.exports;
    exports.modules = externalModules.concat(internalModules);
    exports.states = states;
})(angular, require, module);