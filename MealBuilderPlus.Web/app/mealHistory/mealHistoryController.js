/**
 * Created by briantroncone on 7/27/2014.
 */
(function(){
    "use strict";

    var controllerId = 'mealHistoryController';

    angular.module('mealBuilderPlusApp').controller(controllerId,
        ['$scope', 'mealBuilderService', mealHistoryController]);

    function mealHistoryController($scope, mealBuilderService ) {

        var init = function () {
            $scope.mealList = mealBuilderService.getAllMeals();
        };





        init();
    }
}());
