(function () {
    "use strict";

    angular
        .module('app')
        .directive('movie', movie);

    movie.$inject = ['$compile', '$document'];

    function movie($compile, $document) {
        return {
            restrict: 'E',
            scope: {
                'mId': '@',
                'name': '@',
                'duration': '@'
            },
            // TODO: make duration input type number
            templateUrl: '/app/directives/movie.template.html',
            link: function (scope, element, attrs) {
                let handler = angular.element(element[0].querySelector('.movie'));

                handler.on('mousedown', dragStart);

                /* ===== INTERNAL METHODS ===== */
                function dragStart(event) {
                    if (event.which != 1) return;

                    event.preventDefault();

                    scope.break = calcBreak(scope.duration);

                    let showtime = createShowtime(scope.mId, scope.name, scope.duration, scope.format, scope.break);


                    document.querySelector('#main').appendChild(showtime[0]);
                    $compile(showtime)(scope);
                }

                function createShowtime(mId, name, duration, format, breakTime) {
                    return angular.element(`<showtime class="dragging"
                                                      dragging-from-sidebar
                                                      m-id="${mId}"
                                                      name="${name}"
                                                      duration="${duration}"
                                                      format="${format}"
                                                      break="${breakTime}">
                                            </showtime>`);
                }

                function calcBreak(duration) {
                    let breakTime;

                    if (duration % 5 !== 0) {
                        breakTime = 10 - duration % 5;
                    } else {
                        breakTime = 10;
                    }

                    return breakTime;
                }
            }
        };
    }

})();