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
            var generatedMeals = [];


        }

        function checkAvailability(meals, requestedMealTypes){
            var status = [];
            _(requestedMealTypes).forEach(function(requestedType){
                var requestedCount = _.where(requestedMealTypes, {'mealType': requestedType.mealType});
                var mealCount = _.where(meals, {'mealType': requestedType.mealType});
                console.log(requestedCount.length);
                console.log(mealCount.length);
                if(requestedCount.length > mealCount.length){
                    status.push("There are not enough " + requestedType.mealType + " meals to support your request.");
                }

            });
            return status;
        }
    }
})();