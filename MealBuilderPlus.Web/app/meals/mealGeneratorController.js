(function(){
    "use strict";

    angular
        .module("mealBuilderPlusApp")
        .controller("mealGeneratorController", mealGeneratorController);

    mealGeneratorController.$inject = ["mealBuilderService", "mealGeneratorService", "alertService"];

    function mealGeneratorController(mealBuilderService, mealGeneratorService, alertService){
        /* jshint validthis: true */
        var vm = this;
        vm.meals = {};
        vm.mealsToAdd = 0;
        vm.mealTypes = [];
        vm.requestedMealTypes = [];
        vm.weeklyMeals = [];
        vm.addMealTypes = addMealTypes;
        vm.generateMeals = generateMeals;

        activate();
        function activate(){
            return mealBuilderService.getAllMeals()
                .then(function(data){
                    vm.meals = data;
                    vm.mealTypes = mealGeneratorService.getMealTypes(vm.meals);
                }, onError);

        }

        function addMealTypes(num){
            vm.requestedMealTypes = [];
            for(var i = 0; i < num; i++){
                vm.requestedMealTypes.push({mealType:""});
            }
        }

        function generateMeals(){
            var status = mealGeneratorService.checkAvailability(vm.meal, vm.requestedMealTypes);
            if(status.length === 0) {
                vm.weeklyMeals = mealGeneratorService.generateMeals(vm.meals, vm.requestedMealTypes);
            }else{
                alertService.withError(status[0]);
            }
        }

        function onError(){
            alertService.error("There was an error loading the meals!");
        }
    }
})();