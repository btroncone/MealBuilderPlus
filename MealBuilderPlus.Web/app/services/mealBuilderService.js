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
            updateMeal: updateMeal,
            getAllIngredients: getAllIngredients,
            getIngredient: getIngredient,
            saveIngredient: saveIngredient,
            deleteIngredient: deleteIngredient,
            updateIngredient: updateIngredient,
            addIngredientToMeal: addIngredientToMeal,
            deleteIngredientFromMeal: deleteIngredientFromMeal,
            acceptMeals: acceptMeals
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

        function updateMeal(meal){
            return $http.put('/api/meals', meal);
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

        function updateIngredient(ingredient){
            var updatedIngredient = {
                ingredientId: ingredient.ingredientId,
                name: ingredient.name,
                checkPantry: ingredient.checkPantry
            };
            return $http.put('/api/ingredients', updatedIngredient);
        }

        function addIngredientToMeal(ingredientId, mealId){
            return $http.post('/api/ingredients/' + ingredientId + '/meals/' + mealId );
        }

        function deleteIngredientFromMeal(ingredientId, mealId){
            return $http.delete('/api/ingredients/' + ingredientId + '/meals/' + mealId);
        }

        function acceptMeals(meals){
            return $http.post('/api/meals', meals);
        }


    }
}());