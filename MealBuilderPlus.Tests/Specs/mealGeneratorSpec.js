describe("the mealGeneratorController", function(){
    var $rootScope,
        $controller,
        $httpBackend,
        alertServiceSpy,
        scope;

    var fakeMealData = [
        {
            id: 1,
            name: 'Tacos',
            mealType: 'Beef',
            ingredients: [
                {
                    name: 'Beef'
                },
                {
                    name: 'Cheese'
                }]
        },
        {
            id: 2,
            name: 'Spaghetti',
            mealType: 'Other',
            ingredients: [
                {
                    name: 'Pasta'
                },
                {
                    name: 'Tomato Sauce'
                },
                {
                    name: 'Garlic'
                }]
        },
        {
            id: 3,
            name: 'Hamburgers',
            mealType: 'Beef',
            ingredients: [
                {
                    name: 'Beef'
                },
                {
                    name: 'Bread'
                }]
        },
        {
            id: 4,
            name: 'Salmon',
            mealType: 'Fish',
            ingredients: [
                {
                    name: 'Garlic'
                },
                {
                    name: 'Pasta'
                }]
        }
    ];

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
        $httpBackend.when("GET","/api/meals").respond(fakeMealData);
        $controller("mealGeneratorController as vm", {
            $scope: scope
        });
        $httpBackend.flush();
    });

    it("should retrieve all meals upon mealGeneratorController initialization", function(){
        expect(scope.vm.meals.length).toBe(4);
    });

    it("should initially set meals to add to zero", function(){
        expect(scope.vm.mealsToAdd).toBe(0);

    });



    it("should add desired meal types when the user increases meals to add", function(){
        scope.vm.addMealTypes(3);
        expect(scope.vm.requestedMealTypes.length).toBe(3);
    });


});
