(function(){
    "use strict";

    angular
        .module("mealBuilderPlusApp")
        .controller("mealGeneratorController", mealGeneratorController);

    mealGeneratorController.$inject = ["$timeout","mealBuilderService", "mealGeneratorService", "alertService"];

    function mealGeneratorController($timeout, mealBuilderService, mealGeneratorService, alertService){
        /* jshint validthis: true */
        var vm = this;
        vm.meals = {};
        vm.mealTypes = [];
        vm.requestedMealTypes = [];
        vm.weeklyMeals = [];
        vm.mealsToAdd = 0;
        vm.addMealTypes = addMealTypes;
        vm.generateMeals = generateMeals;
        vm.reset = reset;
        vm.acceptMeals = acceptMeals;
        //Need both to get proper UI transition with meal generation
        vm.mealsGenerated = false;
        vm.mealsNotGenerated = false;

        activate();
        function activate(){
            //TODO Use route resolve
            return mealBuilderService.getAllMeals()
                .then(function(data){
                    vm.meals = data;
                    vm.mealsNotGenerated = vm.meals.length > 0;
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
            var status = mealGeneratorService.checkAvailability(vm.meals, vm.requestedMealTypes);
            if(status.length === 0) {
                vm.weeklyMeals = mealGeneratorService.generateWeeklyMeals(vm.meals, vm.requestedMealTypes);
                vm.mealsNotGenerated = false;
                $timeout(function(){
                    vm.mealsGenerated = true;
                }, 2000);
            }else{
                alertService.withError(status[0]);
            }
        }

        function reset(){
            vm.mealsGenerated = false;

            $timeout(function(){
                vm.mealsNotGenerated = true;
                vm.mealsToAdd = 0;
            }, 2000);
        }

        function acceptMeals(){
            mealBuilderService.acceptMeals(vm.weeklyMeals)
                .then(function(){
                    alertService.withSuccess("Your meals have been accepted!");
                }, function(){
                    alertService.withError("Error! Please try again!");
                });
        }

        function onError(){
            alertService.error("There was an error loading the meals!");
        }
    }
})();