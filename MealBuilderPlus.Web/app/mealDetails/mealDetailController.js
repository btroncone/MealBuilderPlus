/**
 * Created by briantroncone on 7/28/2014.
 */
(function(){
    "use strict";

    angular
        .module("mealBuilderPlusApp")
        .controller('mealDetailController', mealDetailController);

    mealDetailController.$inject = ['$routeParams','mealBuilderService'];

    function mealDetailController($routeParams, mealBuilderService){
        /* jshint validthis: true */
        var vm = this;
        var mealId = $routeParams.mealId;
        vm.meal = {};
        vm.isLastEaten = undefined;
        vm.isAddingIngredients = false;
        vm.addIngredients = addIngredients;
        vm.availableIngredients = [
            {
                id: 1,
                name: "Sugar",
                checkPantry: false
            },
            {
                id: 2,
                name: "Milk",
                checkPantry: true
            },
            {
                id: 3,
                name: "Pasta",
                checkPantry: false
            },
            {
                id: 4,
                name: "Bread",
                checkPantry: false
            }];

        activate();
        //TODO $q.all
        function activate(){
            return mealBuilderService.getMeal(mealId)
                .then(function(data){
                    vm.meal = data;
                    vm.meal.ingredients = [{
                            id: 1,
                            name: "Sugar",
                            checkPantry: false
                        },
                        {
                            id: 2,
                            name: "Milk",
                            checkPantry: true
                        },
                        {
                            id: 3,
                            name: "Pasta",
                            checkPantry: false
                        }];
                    vm.isLastEaten = vm.meal.lastEaten ? true : false;
                    getAvailableIngredients();
                    return vm.meal;
                }, function(){
                    toastr.error("Error!");
                })
                .then(function(){
                     console.log("Hello world!");
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
            console.log(vm.availableIngredients);
        }
    }
}());