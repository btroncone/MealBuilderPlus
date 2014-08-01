/**
 * Created by briantroncone on 7/29/2014.
 */
(function(){
    "use strict";

    angular
        .module("mealBuilderPlusApp")
        .controller('mealEntryController', mealEntryController);

    mealEntryController.$inject = ['mealBuilderService'];

    function mealEntryController(mealBuilderService){
        /* jshint validthis: true */
        var vm = this;
        vm.meal = {};
        vm.mealType = undefined;
        vm.mealTypes = ["Chicken", "Beef", "Fish", "Other"];
        vm.saveMeal = saveMeal;

        function saveMeal(){
            mealBuilderService.saveMeal(vm.meal)
                .success(function(){
                    toastr.success("Meal Successfully Saved!");
                    vm.meal = {};
                    vm.mealType = undefined;
                })
                .error(function(){
                    toastr.error("Error saving meal!");
                });
        };
    }
}());
