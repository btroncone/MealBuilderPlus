/**
 * Created by briantroncone on 7/24/2014.
 */
(function(){
    "use strict";

    var controllerId = 'mainController';

    angular.module('mealBuilderPlusApp').controller(controllerId,
        ['$scope', 'mealBuilderService', mainController]);

    function mainController($scope, mealBuilderService) {
        $scope.meals = mealBuilderService.getAllMeals();
        $scope.activate = activate;

        function activate() {
        }
    }
}());
