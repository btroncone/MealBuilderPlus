(function () {
    'use strict';

    angular
        .module('mealBuilderPlusApp')
        .factory('mealBuilderService', mealBuilderService);

    mealBuilderService.$inject = ['$http'];

    function mealBuilderService($http) {

        var service = {
            getAllMeals: getAllMeals,
            getMeal: getMeal,
            saveMeal: saveMeal,
            deleteMeal: deleteMeal,
            getAllIngredients: getAllIngredients,
            getIngredient: getIngredient,
            saveIngredient: saveIngredient,
            deleteIngredient: deleteIngredient,
            addIngredientToMeal: addIngredientToMeal,
            deleteIngredientFromMeal: deleteIngredientFromMeal
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

        function deleteMeal(mealId){
            return $http.delete('/api/meals/' + mealId);
        }

        function getAllIngredients(){
            return $http.get('/api/ingredients')
                .then(function(response){
                    return response.data;
                });
        }

        function saveIngredient(ingredient){
            return $http.post('/api/ingredients', ingredient);
        }

        function getIngredient(ingredientId){
            return $http.get('/api/ingredients/' + ingredientId)
                .then(function(response){
                    return response.data;
                });
        }

        function deleteIngredient(ingredientId){
            return $http.delete('/api/ingredients/' + ingredientId);
        }

        function addIngredientToMeal(ingredientId, mealId){
            return $http.post('/api/ingredients/' + ingredientId + '/meals/' + mealId );
        }

        function deleteIngredientFromMeal(ingredientId, mealId){
            return $http.delete('/api/ingredients/' + ingredientId + '/meals/' + mealId);
        }
    }
}());