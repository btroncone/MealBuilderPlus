(function () {
    'use strict';

    var serviceId = 'mealBuilderService';

    angular.module('mealBuilderPlusApp').factory(serviceId, ['$http', mealBuilderService]);

    function mealBuilderService($http) {

        var service = {
            getAllMeals: getAllMeals,
            getMeal: getMeal,
            saveMeal: saveMeal
        };

        return service;

        function getAllMeals() {
            return $http.get('/api/meals')
                .then(function(response){
                    return response.data;
                });
        }

        function getMeal(mealId){
            return $http.get('/api/meals/' + mealId)
                .then(function(response){
                    return response.data;
                });
        }

        function saveMeal(meal){
            return $http.post('/api/meals', meal);
        }


        //#region Internal Methods        

        //#endregion
    }
}());