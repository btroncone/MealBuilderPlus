(function(){
    "use strict";

    angular
        .module("mealBuilderPlusApp")
        .factory("mealGeneratorService", mealGeneratorService);

    function mealGeneratorService(){
        var service = {
            checkAvailability: checkAvailability,
            generateWeeklyMeals : generateWeeklyMeals,
            getMealTypes: getMealTypes
        };

        return service;


        function getMealTypes(meals){
            return _(meals).chain()
                           .pluck("mealType")
                           .uniq()
                           .value();
        }

        function generateWeeklyMeals(meals, requestedMealTypes) {
            //var weeklyMealsAndIngredients = [];
            return getMealsFromMealTypes(meals, requestedMealTypes);
            //var ingredientList = compileIngredients(generatedMeals);

            //weeklyMealsAndIngredients.push(generatedMeals);
            //weeklyMealsAndIngredients.push(ingredientList);

            //return generatedMeals;
        }

        function checkAvailability(meals, requestedMealTypes){
            var status = [];
            _(requestedMealTypes).forEach(function(requestedType){
                var requestedCount = _.where(requestedMealTypes, {'mealType': requestedType.mealType});
                var mealCount = _.where(meals, {'mealType': requestedType.mealType});
                if(requestedCount.length > mealCount.length){
                    status.push("There are not enough " + requestedType.mealType + " meals to support your request.");
                }
            });
            return status;
        }

        function getMealsFromMealTypes(meals, requestedMealTypes){
            var selectedMeals = [];
            var mealsToCheck = _.clone(meals);
            _(requestedMealTypes).forEach(function(requestedType){
                var meal = _(mealsToCheck).chain()
                                   .where({'mealType': requestedType.mealType})
                                   .shuffle()
                                   .first()
                                   .value();
                selectedMeals.push(meal);
                mealsToCheck.splice(_.findIndex(mealsToCheck, {'mealId': meal.mealId}), 1);
            });
            return selectedMeals;
        }

        function compileIngredients(generatedMeals){

        }
    }
})();