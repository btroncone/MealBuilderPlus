describe("the ingredientInformationController", function(){
    var $rootScope,
        $controller,
        $httpBackend,
        alertServiceSpy,
        scope;

    beforeEach(module('mealBuilderPlusApp', function($provide){
        alertServiceSpy = jasmine.createSpyObj("alertService",["withSuccess","withError"]);
        alertServiceSpy.withSuccess.andReturn();
        alertServiceSpy.withError.andReturn();
        $provide.value("alertService", alertServiceSpy);
    }));

    beforeEach(inject(function(_$rootScope_, _$controller_, _$httpBackend_){
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;
        scope = $rootScope.$new();
    }));

    afterEach(function(){
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    beforeEach(function(){
        $httpBackend.when("GET", "/api/ingredients").respond([{ingredientId:1},{ingredientId:2},{ingredientId:3}]);
        $controller("ingredientInformationController as vm", {
            $scope: scope
        });
        $httpBackend.flush();
    });

    it("should retrieve ingredients to a list", function(){
        expect(scope.vm.ingredientList.length).toBe(3);
    });

    it("should delete ingredient when deleteIngredient is called", function(){
        $httpBackend.when("DELETE", "/api/ingredients/1").respond(200);
        scope.vm.deleteIngredient(0);
        $httpBackend.flush();
        expect(scope.vm.ingredientList.length).toBe(2);
        expect(alertServiceSpy.withSuccess).toHaveBeenCalled();
    });

    it("should display an error message when the ingredient cannot be deleted", function(){
        $httpBackend.when("DELETE", "/api/ingredients/1").respond(400);
        scope.vm.deleteIngredient(0);
        $httpBackend.flush();
        expect(alertServiceSpy.withError).toHaveBeenCalled();
    });
});
