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
        $httpBackend.when("GET", "/api/meals").respond([{},{},{}]);
        $controller("mealInformationController as vm", {
            $scope: scope
        });
        $httpBackend.flush();
    });

    it("should retrieve meals to a list", function(){
        expect(scope.vm.mealList.length).toBe(3);
    });

});