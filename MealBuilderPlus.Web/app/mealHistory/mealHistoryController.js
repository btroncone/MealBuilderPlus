(function(){
    "use strict";

    angular
        .module('mealBuilderPlusApp')
        .controller('mealHistoryController', mealHistoryController);

    mealHistoryController.$inject = ['$location', 'mealBuilderService'];

    function mealHistoryController($location, mealBuilderService ) {
        /* jshint validthis: true */
        var vm = this;
        vm.mealList = [];
        vm.getMealDetails = getMealDetails;

        activate();

        function activate(){
            return mealBuilderService.getAllMeals()
                .then(function(data){
                    vm.mealList = data;
                    return vm.mealList;
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

