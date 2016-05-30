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
                'seatsCount': '@'
            },
            link: function ($scope, element, attrs) {
                
            },
            template: '<div class="halls__item">' +
                            '<span>{{ name }}</span>' +
                            '<small>{{ seatsCount }} места</small>' +
                      '</div>'
        };
    }

})();