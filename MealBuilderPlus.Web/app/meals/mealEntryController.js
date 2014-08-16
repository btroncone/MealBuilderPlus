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
        vm.mealTypes = [];
        vm.saveMeal = saveMeal;

        activate();
        function activate(){
            return mealBuilderService.getMealTypes()
                .then(function(data){
                    vm.mealTypes = data;
                });
        }

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
