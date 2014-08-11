(function(){
    "use strict";

    angular
        .module('mealBuilderPlusApp')
        .factory('alertService', alertService);

    function alertService (){

        var service = {
            withSuccess: withSuccess,
            withError: withError,
            withWarning: withWarning,
            withInformation: withInformation
        };

        return service;

        function withSuccess(msg){
            toastr.success(msg);
        }

        function withError(msg){
            toastr.error(msg);
        }

        function withInformation(msg){
            toastr.withInformation(msg);
        }

        function withWarning(msg) {
            toastr.info(msg);
        }
    }
}());
