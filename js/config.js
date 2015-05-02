/**
 * Created by Amit Thakkar on 02/05/15.
 */
(function (ng, require) {
    require('angular-ui-router');
    var externalModules = [
        'ui.router'
    ];
    var internalModules = [
        'browserifyApp.home',
        'browserifyApp.product'
    ];
    var internalModuleObjects = [
        require('./home/browserifyApp.home'),
        require('./product/browserifyApp.product')
    ];
    ng.forEach(internalModuleObjects, function (internalModuleObject) {
        internalModuleObject.config(['$controllerProvider', '$provide', '$compileProvider',
            function ($controllerProvider, $provide, $compileProvider) {
                internalModuleObject.controller = function (name, constructor) {
                    $controllerProvider.register(name, constructor);
                    return (this);
                };
                internalModuleObject.service = function (name, constructor) {
                    $provide.service(name, constructor);
                    return (this);
                };
                internalModuleObject.factory = function (name, factory) {
                    $provide.factory(name, factory);
                    return (this);
                };
                internalModuleObject.value = function (name, value) {
                    $provide.value(name, value);
                    return (this);
                };
                internalModuleObject.directive = function (name, factory) {
                    $compileProvider.directive(name, factory);
                    return (this);
                };
            }]);
    });
    module.exports.modules = externalModules.concat(internalModules);
})(angular, require);