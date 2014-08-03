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
            .when('/mealentry', {
                templateUrl: 'app/mealEntry/mealentry.html',
                controller: 'mealEntryController',
                controllerAs: 'vm'
            })
            .when('/mealInformation', {
                templateUrl: 'app/mealInformation/mealInformation.html',
                controller: 'mealInformationController',
                controllerAs: 'vm'
            })
            .when('/meal/:mealId', {
                templateUrl: 'app/mealDetails/mealDetails.html',
                controller: 'mealDetailController',
                controllerAs: 'vm'
            })
            .when('/mealgenerator', {
                templateUrl: 'app/mealGenerator/mealgenerator.html'
            });
    }
}());
