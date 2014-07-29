/**
 * Created by briantroncone on 7/28/2014.
 */
(function(){
    "use strict";

    var controllerId = "mealDetailController";

    angular.module("mealBuilderPlusApp").controller(controllerId,
        ['$scope', '$routeParams','mealBuilderService', mealDetailController]);

    function mealDetailController($scope, $routeParams, mealBuilderService){

        var init = function(){
            mealBuilderService.getMeal(mealId).then(onMeal, onError);
        };

        var mealId = $routeParams.mealId;

        var onMeal = function(data){
            $scope.meal = data;
        };

        var onError = function(error){
            $scope.error = "There was an error during your request:" + error;
        };

        init();
    }

}());