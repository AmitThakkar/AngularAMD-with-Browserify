/**
 * Created by Amit Thakkar on 04/05/15.
 */
(function (module) {
    module.exports = function (module) {
        module.config(['$controllerProvider', '$provide', '$compileProvider', function ($controllerProvider, $provide, $compileProvider) {
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
            module.constant = function (name, value) {
                $provide.constant(name, value);
                return (this);
            };
            module.directive = function (name, factory) {
                $compileProvider.directive(name, factory);
                return (this);
            };
        }]);
    };
})(module);