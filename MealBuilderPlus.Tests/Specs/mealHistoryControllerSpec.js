beforeEach(module("mealBuilderPlusApp"));
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

describe("the mealHistoryController", function(){

    beforeEach(function(){
        $httpBackend.when("GET", "/api/meals").respond([{},{},{}]);
        $controller("mealHistoryController", {
            $scope: scope
        });
        $httpBackend.flush();
    });

    it("should retrieve meals to a list", function(){
        expect(scope.mealList.length).toBe(3);
    });

});