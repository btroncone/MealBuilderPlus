/**
 * Created by briantroncone on 7/28/2014.
 */
(function(){
    "use strict";

    angular
        .module("mealBuilderPlusApp")
        .controller('mealDetailController', mealDetailController);

    mealDetailController.$inject = ['$routeParams','mealBuilderService'];

    function mealDetailController($routeParams, mealBuilderService){
        /* jshint validthis: true */
        var vm = this;
        var mealId = $routeParams.mealId;

        activate();

        function activate(){
            return mealBuilderService.getMeal(mealId)
                .then(function(data){
                    vm.meal = data;
                    return vm.meal;
                }, function(){
                    toastr.error("Error!");
                });
        }
    }

}());