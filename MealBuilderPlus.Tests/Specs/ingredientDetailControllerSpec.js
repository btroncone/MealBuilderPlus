describe("the ingredientDetailController", function(){
    var $rootScope,
        $controller,
        $httpBackend,
        scope;

    beforeEach(module("mealBuilderPlusApp"));

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
        $httpBackend.when("GET","/api/ingredients/1").respond({ingredientId: 1});
        $controller("ingredientDetailController as vm", {
            $scope: scope,
            $routeParams: {ingredientId: 1}
        });
        $httpBackend.flush();
    });

    it('should retrieve the requested ingredient', function(){
        expect(scope.vm.ingredient.ingredientId).toBe(1);
    });
});