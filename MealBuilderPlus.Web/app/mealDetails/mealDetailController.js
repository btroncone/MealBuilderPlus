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
        vm.allIngredients = {};
        vm.isLastEaten = undefined;
        vm.isAddingIngredients = false;

        activate();

        //TODO extract this into route resolve
        function activate(){
            return mealBuilderService.getMeal(mealId)
                .then(function(data){
                    vm.meal = data;
                    vm.isLastEaten = vm.meal.lastEaten ? true : false;
                    return vm.meal;
                }, function(){
                    toastr.error("Error!");
                })
                .then(function(){
                     console.log("Hello world!");
                });
        }

    }

}());