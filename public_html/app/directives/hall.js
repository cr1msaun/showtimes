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
            template: '<div class="halls__item">' +
                            '<span>{{ name }}</span>' +
                            '<small>{{ note }}</small>' +
                      '</div>'
        };
    }

})();