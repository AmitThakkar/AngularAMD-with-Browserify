/**
 * Created by Amit Thakkar on 02/05/15.
 */
(function (ng, require) {
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
    var states = [];
    ng.forEach(internalModuleObjects, function (internalModuleObject) {
        states = states.concat(internalModuleObject.states);
        var module = internalModuleObject.module;
        module.config(['$controllerProvider', '$provide', '$compileProvider',
            function ($controllerProvider, $provide, $compileProvider) {
                module.controller = function (name, constructor) {
                    $controllerProvider.register(name, constructor);
                    return (this);
                };
                module.service = function (name, constructor) {
                    $provide.service(name, constructor);
                    return (this);
                };
                module.factory = function (name, factory) {
                    $provide.factory(name, factory);
                    return (this);
                };
                module.value = function (name, value) {
                    $provide.value(name, value);
                    return (this);
                };
                module.directive = function (name, factory) {
                    $compileProvider.directive(name, factory);
                    return (this);
                };
            }]);
    });
    var exports = module.exports;
    exports.modules = externalModules.concat(internalModules);
    exports.states = states;
})(angular, require);