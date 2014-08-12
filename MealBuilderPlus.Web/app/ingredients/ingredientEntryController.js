(function(){
    "use strict";

    angular
        .module("mealBuilderPlusApp")
        .controller('ingredientEntryController', ingredientEntryController);

    ingredientEntryController.$inject = ['mealBuilderService', 'alertService'];

    function ingredientEntryController(mealBuilderService, alertService){
        /* jshint validthis: true */
        var vm = this;
        vm.ingredient = {};
        vm.saveIngredient = saveIngredient;

        function saveIngredient(){
            mealBuilderService.saveIngredient(vm.ingredient)
                .success(function(){
                    alertService.withSuccess("Ingredient Successfully Saved!");
                    vm.ingredient = {};
                })
                .error(function(){
                    alertService.withError("Error saving meal!");
                });
        }
    }
}());
