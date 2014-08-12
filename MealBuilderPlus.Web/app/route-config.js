(function(){
    "use strict";
    angular
        .module('mealBuilderPlusApp')
        .config(config);

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/main/main.html'
            })
            .when('/mealEntry', {
                templateUrl: 'app/meals/mealEntry.html',
                controller: 'mealEntryController',
                controllerAs: 'vm'
            })
            .when('/mealInformation', {
                templateUrl: 'app/meals/mealInformation.html',
                controller: 'mealInformationController',
                controllerAs: 'vm'
            })
            .when('/meal/:mealId', {
                templateUrl: 'app/meals/mealDetails.html',
                controller: 'mealDetailController',
                controllerAs: 'vm'
            })
            .when('/ingredientInformation', {
                templateUrl: 'app/ingredients/ingredientInformation.html',
                controller: 'ingredientInformationController',
                controllerAs: 'vm'
            })
            .when('/ingredientEntry', {
                templateUrl: 'app/ingredients/ingredientEntry.html',
                controller: 'ingredientEntryController',
                controllerAs: 'vm'
            })
            .when('/ingredient/:ingredientId', {
                templateUrl: 'app/ingredients/ingredientDetails.html',
                controller: 'ingredientDetailController',
                controllerAs: 'vm'
            })
            .when('/mealGenerator', {
                templateUrl: 'app/meals/mealGenerator.html'
            });
    }
}());
