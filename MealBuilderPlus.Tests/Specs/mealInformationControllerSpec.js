describe("the mealInformationController", function(){
    beforeEach(module('mealBuilderPlusApp'));
    var $rootScope, $controller, $httpBackend, scope;
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
        $httpBackend.when("GET", "/api/meals").respond([{mealId:1},{mealId:2},{mealId:3}]);
        $controller("mealInformationController as vm", {
            $scope: scope
        });
        $httpBackend.flush();
    });

    it("should retrieve meals to a list", function(){
        expect(scope.vm.mealList.length).toBe(3);
    });

    it("should delete meal when deleteMeal is called", function(){
        $httpBackend.when("DELETE", "/api/meals/1").respond(200);
        scope.vm.deleteMeal(0);
        $httpBackend.flush();
        expect(scope.vm.mealList.length).toBe(2);
    });

});
