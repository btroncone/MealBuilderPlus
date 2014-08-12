(function(){
    "use strict";

    angular
        .module("mealBuilderPlusApp")
        .controller('mealDetailController', mealDetailController);

    mealDetailController.$inject = ['$routeParams', '$q','mealBuilderService', 'alertService'];

    function mealDetailController($routeParams, $q, mealBuilderService, alertService){
        /* jshint validthis: true */
        var vm = this;
        var mealId = $routeParams.mealId;
        vm.meal = {};
        vm.availableIngredients = {};
        vm.isLastEaten = undefined;
        vm.isAddingIngredients = false;
        vm.addIngredients = addIngredients;
        vm.addIngredientToMeal = addIngredientToMeal;
        vm.deleteIngredientFromMeal = deleteIngredientFromMeal;

        activate();
        function activate(){
            return $q.all([mealBuilderService.getMeal(mealId), mealBuilderService.getAllIngredients()])
                .then(function(data){
                    vm.meal = data[0];
                    vm.availableIngredients = data[1];
                    vm.isLastEaten = vm.meal.lastEaten ? true : false;
                    getAvailableIngredients();
                    return vm.meal;
                }, onError);
        }

        function addIngredients(){
            vm.isAddingIngredients = !vm.isAddingIngredients;
        }

        function addIngredientToMeal($index){
            var ingredientToAdd = vm.availableIngredients[$index];
            mealBuilderService.addIngredientToMeal(ingredientToAdd.ingredientId, vm.meal.mealId)
                              .then(function(){
                                vm.meal.ingredients.push(ingredientToAdd);
                                vm.availableIngredients.splice($index, 1);
                                if(vm.availableIngredients.length === 0){
                                    vm.isAddingIngredients = false;
                                }
                                alertService.withSuccess('Ingredient Added Successfully!');
                              }, onError);
        }

        function deleteIngredientFromMeal($index){
            var ingredientToDelete = vm.meal.ingredients[$index];
            mealBuilderService.deleteIngredientFromMeal(ingredientToDelete.ingredientId, vm.meal.mealId)
                .then(function(){
                    vm.meal.ingredients.splice($index, 1);
                    vm.availableIngredients.push(ingredientToDelete);
                    vm.isAddingIngredients = true;
                    alertService.withSuccess('Ingredient Successfully Removed!');
                }, onError);
        }

        function getAvailableIngredients(){
            for(var i=0 ; i < vm.availableIngredients.length; i++)
            {
                for(var x=0 ; x < vm.meal.ingredients.length; x++)
                {
                    if(vm.availableIngredients[i].id === vm.meal.ingredients[x].id) {
                        vm.availableIngredients.splice(i, 1);
                    }
                }
            }
        }

        function onError(){
            alertService.withError('There was an error processing your request, please try again!');
        }
    }
}());