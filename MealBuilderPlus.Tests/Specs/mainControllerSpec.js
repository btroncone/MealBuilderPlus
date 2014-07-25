/**
 * Created by briantroncone on 7/24/2014.
 */
describe("MainController", function(){
    "use strict";

    var scope, $controllerConstructor, mockMealBuilderService;

    beforeEach(module("mealBuilderPlusApp"));

    beforeEach(inject(function($controller, $rootScope){
        scope = $rootScope.$new();
        mockMealBuilderService = sinon.stub({getAllMeals: function (){}});
            $controllerConstructor = $controller;
        }));

    it('should set the scope meals to the result of mealBuilderService.getAllMeals', function(){
        var mockMeals = {};
        mockMealBuilderService.getAllMeals.returns(mockMeals);

        var controller = $controllerConstructor("mainController",
            {$scope: scope, mealBuilderService: mockMealBuilderService});

        expect(scope.meals).toBe(mockMeals);
    });
});