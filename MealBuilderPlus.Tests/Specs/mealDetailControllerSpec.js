describe("the mealDetailController", function(){
    var $rootScope,
        $controller,
        $httpBackend,
        alertServiceSpy,
        scope;

    beforeEach(module("mealBuilderPlusApp", function($provide){
        alertServiceSpy = jasmine.createSpyObj("alertService",["withSuccess","withError"]);
        alertServiceSpy.withSuccess.andReturn(true);
        alertServiceSpy.withError.andReturn(true);
        $provide.value("alertService", alertServiceSpy);
    }));

    beforeEach(inject(function(_$rootScope_,_$controller_, _$httpBackend_){
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;
        scope = $rootScope.$new();
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
    beforeEach(function () {
        $httpBackend.when("GET","/api/meals/1").respond({mealId: 1, ingredients:[{ingredientId:1},{ingredientId:2}]});
        $httpBackend.when("GET","/api/ingredients").respond([{ingredientId: 1},{ingredientId: 2},{ingredientId: 3}]);
        $controller("mealDetailController as vm", {
            $scope: scope,
            $routeParams: {mealId: 1}
        });
        $httpBackend.flush();
    });

    it('should retrieve the requested meal', function(){
        expect(scope.vm.meal.mealId).toBe(1);
        expect(scope.vm.meal.ingredients.length).toBe(2);
    });

    it('should subtract ingredients already in meal for available ingredients', function(){
        expect(scope.vm.availableIngredients.length).toBe(1);
    });

    it('should add ingredients to meal and remove from available ingredients', function(){
        $httpBackend.when("POST", "/api/ingredients/3/meals/1").respond(200);
        scope.vm.addIngredientToMeal(0);
        $httpBackend.flush();
        expect(scope.vm.availableIngredients.length).toBe(0);
        expect(scope.vm.meal.ingredients.length).toBe(3);
        expect(alertServiceSpy.withSuccess).toHaveBeenCalled();
    });

    it('should remove ingredients from meal and add to available ingredients', function(){
        $httpBackend.when("DELETE", "/api/ingredients/1/meals/1").respond(200);
        scope.vm.deleteIngredientFromMeal(0);
        $httpBackend.flush();
        expect(scope.vm.meal.ingredients.length).toBe(1);
        expect(scope.vm.availableIngredients.length).toBe(2);
        expect(alertServiceSpy.withSuccess).toHaveBeenCalled();
    });

    it('should show an error when the item is not successfully removed', function(){
        $httpBackend.when("DELETE", "/api/ingredients/1/meals/1").respond(400);
        scope.vm.deleteIngredientFromMeal(0);
        $httpBackend.flush();
        expect(alertServiceSpy.withError).toHaveBeenCalled();
    });


});