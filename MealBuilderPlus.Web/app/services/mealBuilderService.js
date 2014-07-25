(function () {
    'use strict';

    var serviceId = 'mealBuilderService';

    angular.module('mealBuilderPlusApp').factory(serviceId, ['$http', mealBuilderService]);

    function mealBuilderService($http) {

        var service = {
            getAllMeals: getAllMeals
        };

        return service;

        function getAllMeals() {
            return "test";
        }

        //#region Internal Methods        

        //#endregion
    }
})();