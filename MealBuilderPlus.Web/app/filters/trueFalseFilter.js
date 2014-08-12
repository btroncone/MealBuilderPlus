(function(){
    "use strict";

    angular
        .module("mealBuilderPlusApp")
        .filter("trueFalse", trueFalse);

    function trueFalse(){
        return function(text) {
            if (text) {
                return 'Yes';
            }
            return 'No';
        };
    }
})();