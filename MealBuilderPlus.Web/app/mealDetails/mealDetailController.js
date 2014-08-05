(function(){
    "use strict";

    angular
        .module("mealBuilderPlusApp")
        .controller('mealDetailController', mealDetailController);

    mealDetailController.$inject = ['$routeParams', '$q','mealBuilderService'];

    function mealDetailController($routeParams, $q, mealBuilderService){
        /* jshint validthis: true */
        var vm = this;
        var mealId = $routeParams.mealId;
        vm.meal = {};
        vm.availableIngredients = {};
        vm.isLastEaten = undefined;
        vm.isAddingIngredients = false;
        vm.addIngredients = addIngredients;

        activate();
        function activate(){
            return $q.all([mealBuilderService.getMeal(mealId), mealBuilderService.getAllIngredients()])
                .then(function(data){
                    vm.meal = data[0];
                    vm.availableIngredients = data[1];
                    vm.isLastEaten = vm.meal.lastEaten ? true : false;
                    getAvailableIngredients();
                    return vm.meal;
                }, function(){
                    toastr.error("Error!");
                });
        }

        function addIngredients(){
            vm.isAddingIngredients = !vm.isAddingIngredients;
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
    }
}());