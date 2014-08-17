(function(){
    "use strict";

    angular
        .module("mealBuilderPlusApp")
        .factory("mealGeneratorService", mealGeneratorService);

    mealGeneratorService.$inject = ["$http"];

    function mealGeneratorService($http){
        var service = {
            checkAvailability: checkAvailability,
            generateWeeklyMeals : generateWeeklyMeals,
            acceptWeeklyMeals: acceptWeeklyMeals,
            getMealTypes: getMealTypes
        };

        return service;


        function getMealTypes(meals){
            return _(meals).chain()
                           .pluck("mealType")
                           .uniq()
                           .value();
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

        function generateWeeklyMeals(meals, requestedMealTypes) {
            return getMealsFromMealTypes(meals, requestedMealTypes);
        }

        function acceptWeeklyMeals(meals){
            return $http.post("/api/meals/accept", meals);
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

    }
})();