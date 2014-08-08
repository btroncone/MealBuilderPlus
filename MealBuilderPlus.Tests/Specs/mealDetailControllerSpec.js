describe("the mealDetailController", function(){
    beforeEach(module("mealBuilderPlusApp"));
    var $rootScope, $controller, $httpBackend, scope;
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


    });

    it('should remove ingredients from meal and add to available ingredients', function(){


    });
});