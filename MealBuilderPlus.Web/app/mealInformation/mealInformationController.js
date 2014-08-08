(function(){
    "use strict";

    angular
        .module('mealBuilderPlusApp')
        .controller('mealInformationController', mealInformationController);

    mealInformationController.$inject = ['$location', 'mealBuilderService'];

    function mealInformationController($location, mealBuilderService ) {
        /* jshint validthis: true */
        var vm = this;
        vm.mealList = [];
        vm.getMealDetails = getMealDetails;
        vm.deleteMeal = deleteMeal;
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
                    //toastr.success("Meal deleted!");
                    vm.mealList.splice($index, 1);
                }, onError);
        }
        function getMealDetails(meal){
            $location.url('/meal/' + meal.mealId);
        }

        function onError(){
            toastr.error('error!');
        }

    }
}());

