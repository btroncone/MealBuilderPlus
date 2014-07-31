/**
 * Created by briantroncone on 7/29/2014.
 */
(function(){
    "use strict";

    var controllerId = "mealEntryController";

    angular.module("mealBuilderPlusApp").controller(controllerId,
        ['$scope','mealBuilderService', mealEntryController]);

    function mealEntryController($scope, mealBuilderService){
        $scope.meal = {};
        $scope.mealType = undefined;
        $scope.mealTypes = ["Chicken", "Beef", "Fish", "Other"];
        $scope.saveMeal = function(){
            mealBuilderService.saveMeal($scope.meal)
                .success(function(response){
                    console.log(response);
                    $scope.alerts.push({msg: 'New meal entered, keep going!', type:"success"});
                    $scope.meal = {};
                    $scope.mealType = undefined;
                })
                .error(function(response){
                    console.log("something went wrong!" + response.data);
                });
        };
    }
}());
