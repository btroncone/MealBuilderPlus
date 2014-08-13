(function(){
    "use strict";

    angular
        .module("mealBuilderPlusApp")
        .controller('mealEntryController', mealEntryController);

    mealEntryController.$inject = ['mealBuilderService', 'alertService'];

    function mealEntryController(mealBuilderService, alertService){
        /* jshint validthis: true */
        var vm = this;
        vm.meal = {};
        vm.mealType = undefined;
        //TODO Pull from DB if more meal types needed in future
        vm.mealTypes = ["Chicken", "Beef", "Fish", "Other"];
        vm.saveMeal = saveMeal;

        function saveMeal(){
            mealBuilderService.saveMeal(vm.meal)
                .success(function(){
                    alertService.withSuccess("Meal Successfully Saved!");
                    vm.meal = {};
                    vm.mealType = undefined;
                })
                .error(function(){
                    alertService.withError("Error saving meal!");
                });
        }
    }
}());
