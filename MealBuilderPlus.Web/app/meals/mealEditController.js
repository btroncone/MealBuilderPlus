(function(){
    "use strict";

    angular
        .module("mealBuilderPlusApp")
        .controller("mealEditController", mealEditController);

    mealEditController.$inject = ["$routeParams", "$location", "$q", "mealBuilderService", "alertService"];

    function mealEditController($routeParams, $location, $q, mealBuilderService, alertService){
        /* jshint validthis: true */
        var vm = this;
        var mealId = $routeParams.mealId;
        vm.meal = {};
        vm.updateMeal = updateMeal;
        vm.mealTypes = [];

        activate();
        function activate(){
            return $q.all([mealBuilderService.getMeal(mealId), mealBuilderService.getMealTypes()])
                .then(function(data){
                    vm.meal = data[0];
                    vm.mealTypes = data[1];
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