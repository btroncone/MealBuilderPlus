describe("The mealGeneratorService", function(){

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

    var fakeMealTypeDataValid = [{mealType: "Fish"},{mealType:"Beef"}];
    var fakeMealTypeDataInvalid = [{mealType: "Fish"},{mealType: "Beef"},{mealType: "Other"},{mealType: "Other"}];

    beforeEach(module("mealBuilderPlusApp"));

    it("should retrieve all unique meal types from meal list", inject(function(mealGeneratorService){
        expect(mealGeneratorService.getMealTypes(fakeMealData).length).toBe(3);
    }));
    it('should not return any errors when there are enough meals to support the requested meal types', inject(function(mealGeneratorService){
        expect(mealGeneratorService.checkAvailability(fakeMealData, fakeMealTypeDataValid).length).toBe(0);
    }));
    it('should return errors when there are not enough meals to support the requested meal types', inject(function(mealGeneratorService){
        expect(mealGeneratorService.checkAvailability(fakeMealData, fakeMealTypeDataInvalid).length).toBeGreaterThan(0);
    }));
});

