/**
 * Created by Amit Thakkar on 04/05/15.
 */
(function (module) {
    module.exports = function (internalModule) {
        internalModule.config(['$controllerProvider', '$provide', '$compileProvider', function ($controllerProvider, $provide, $compileProvider) {
            internalModule.controller = function (name, constructor) {
                $controllerProvider.register(name, constructor);
                return (this);
            };
            internalModule.service = function (name, constructor) {
                $provide.service(name, constructor);
                return (this);
            };
            internalModule.factory = function (name, factory) {
                $provide.factory(name, factory);
                return (this);
            };
            internalModule.value = function (name, value) {
                $provide.value(name, value);
                return (this);
            };
            internalModule.constant = function (name, value) {
                $provide.constant(name, value);
                return (this);
            };
            internalModule.directive = function (name, factory) {
                $compileProvider.directive(name, factory);
                return (this);
            };
        }]);
    };
})(module);