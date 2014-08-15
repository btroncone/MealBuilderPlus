(function(){
    "use strict";

    angular
        .module("mealBuilderPlusApp")
        .controller("mealEditController", mealEditController);

    mealEditController.$inject = ["$routeParams", "$location", "mealBuilderService", "alertService"];

    function mealEditController($routeParams, $location, mealBuilderService, alertService){
        /* jshint validthis: true */
        var vm = this;
        var mealId = $routeParams.mealId;
        vm.meal = {};
        vm.updateMeal = updateMeal;

        activate();
        function activate(){
            return mealBuilderService.getMeal(mealId)
                .then(function(data){
                    vm.meal = data;
                });
        }

        function updateMeal(){
            return mealBuilderService.updateMeal(vm.meal)
                .then(function(){
                    alertService.withSuccess("Meal successfully updated!");
                    $location.url("/mealInformation");
                },function(){
                    alertService.withError("There was an error updating the meal, please try again!")
                });
        }
    }
})();