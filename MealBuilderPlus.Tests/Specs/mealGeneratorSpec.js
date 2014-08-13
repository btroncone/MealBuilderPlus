describe("the mealGeneratorController", function(){
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
        $controller("mealGeneratorController as vm", {
            $scope: scope
        });
        $httpBackend.flush();
    });

    //TODO BDD for meal generator

});
