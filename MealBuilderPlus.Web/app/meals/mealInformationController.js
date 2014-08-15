(function(){
    "use strict";

    angular
        .module('mealBuilderPlusApp')
        .controller('mealInformationController', mealInformationController);

    mealInformationController.$inject = ['$location', 'mealBuilderService', 'alertService'];

    function mealInformationController($location, mealBuilderService, alertService) {
        /* jshint validthis: true */
        var vm = this;
        vm.mealList = [];
        vm.getMealDetails = getMealDetails;
        vm.deleteMeal = deleteMeal;
        vm.editMeal = editMeal;

        activate();
        function activate(){
            return mealBuilderService.getAllMeals()
                .then(function(data){
                    vm.mealList = data;
                    return vm.mealList;
                }, onError);
        }

        function deleteMeal($index){
            var meal = vm.mealList[$index];
            return mealBuilderService.deleteMeal(meal.mealId)
                .then(function(){
                    alertService.withSuccess("Meal deleted!");
                    vm.mealList.splice($index, 1);
                }, onError);
        }

        function getMealDetails(meal){
            $location.url('/meal/' + meal.mealId);
        }

        function editMeal(meal){
            $location.url('/mealEdit/' + meal.mealId);
        }

        function onError(){
            alertService.withError('error!');
        }

    }
}());

