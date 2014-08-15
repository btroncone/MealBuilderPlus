(function(){
    "use strict";

    angular
        .module("mealBuilderPlusApp")
        .controller("ingredientEditController", ingredientEditController);

    ingredientEditController.$inject = ["$routeParams", "$location", "mealBuilderService", "alertService"];

    function ingredientEditController($routeParams, $location, mealBuilderService, alertService){
        /* jshint validthis: true */
        var vm = this;
        var ingredientId = $routeParams.ingredientId;
        vm.ingredient = {};
        vm.updateIngredient = updateIngredient;

        activate();
        function activate(){
            return mealBuilderService.getIngredient(ingredientId)
                .then(function(data){
                    vm.ingredient = data;
                });
        }

        function updateIngredient(){
            return mealBuilderService.updateIngredient(vm.ingredient)
                .then(function(){
                    alertService.withSuccess("Ingredient successfully updated!");
                    $location.url("/ingredientInformation");
                },function(){
                    alertService.withError("There was an error updating the ingredient, please try again!")
                });
        }
    }
})();