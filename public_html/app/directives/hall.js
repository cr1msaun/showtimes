(function () {
    "use strict";

    angular
        .module('app')
        .directive('hall', hall);

    function hall() {
        return {
            restrict: 'E',
            scope: {
                'hId': '@',
                'name': '@',
                'note': '@'
            },
            link: function ($scope, element, attrs) {
                
            },
            template: '<span>{{ name }}</span>' +
                      '<small>{{ note }}</small>'
        };
    }

})();