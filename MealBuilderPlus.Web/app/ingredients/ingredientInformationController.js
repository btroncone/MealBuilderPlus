(function(){
    "use strict";

    angular
        .module('mealBuilderPlusApp')
        .controller('ingredientInformationController', ingredientInformationController);

    ingredientInformationController.$inject = ['$location', 'mealBuilderService', 'alertService'];

    function ingredientInformationController($location, mealBuilderService, alertService) {
        /* jshint validthis: true */
        var vm = this;
        vm.ingredientList = [];
        vm.getIngredientDetails = getIngredientDetails;
        vm.deleteIngredient = deleteIngredient;
        activate();

        function activate(){
            return mealBuilderService.getAllIngredients()
                .then(function(data){
                    vm.ingredientList = data;
                    return vm.ingredientList;
                }, onError);
        }

        function deleteIngredient($index){
            var ingredient = vm.ingredientList[$index];
            return mealBuilderService.deleteIngredient(ingredient.ingredientId)
                .then(function(){
                    alertService.withSuccess("Ingredient deleted!");
                    vm.ingredientList.splice($index, 1);
                }, onError);
        }
        function getIngredientDetails(ingredient){
            $location.url('/ingredient/' + ingredient.ingredientId);
        }

        function onError(){
            alertService.withError('Error!');
        }

    }
}());
