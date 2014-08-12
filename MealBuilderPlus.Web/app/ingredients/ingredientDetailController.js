(function(){
    "use strict";

    angular
        .module("mealBuilderPlusApp")
        .controller('ingredientDetailController', ingredientDetailController);

    ingredientDetailController.$inject = ['$routeParams', 'mealBuilderService', 'alertService'];

    function ingredientDetailController($routeParams, mealBuilderService, alertService){
        /* jshint validthis: true */
        var vm = this;
        var ingredientId = $routeParams.ingredientId;
        vm.ingredient = {};


        activate();
        function activate(){
            return mealBuilderService.getIngredient(ingredientId)
                .then(function(data){
                    vm.ingredient = data;
                    return vm.ingredient;
                }, onError);
        }

        function onError(){
            alertService.withError('There was an error processing your request, please try again!');
        }
    }
}());
