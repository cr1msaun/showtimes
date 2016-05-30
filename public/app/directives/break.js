(function () {
    "use strict";

    angular
        .module('app')
        .directive('break', breakBar);

    breakBar.$inject = ['$document'];

    function breakBar($document) {
        return {
            restrict: 'E',
            scope: {
                'minutes': '@'
            },
            link: function (scope, breakBar, attrs) {
                scope.$watch('minutes', changeWidth);
                breakBar.on('mousedown', changeBreak);

                /* ===== INTERNAL METHODS ===== */
                function changeWidth(newMinutes) {
                    breakBar[0].style.width = newMinutes * 2 + 'px';
                }
                
                function changeBreak(event) {
                    event.stopPropagation();

                    var initMousePos = event.pageX;

                    $document.on('mousemove', mousemove);
                    $document.on('mouseup', mouseup);

                    function mousemove(event) {
                        let currentMousePos = event.pageX;

                        // уменьшение (тянем влево)
                        if ( (initMousePos - currentMousePos) >= 10) {
                            setBreak(+scope.minutes - 5);

                            initMousePos = currentMousePos;
                        }

                        // увеличение (тянем вправо)
                        if ( (initMousePos - currentMousePos) <= -10) {
                            setBreak(+scope.minutes + 5);

                            initMousePos = currentMousePos;
                        }
                    }

                    function mouseup() {
                        $document.off('mousemove');
                        $document.off('mouseup');
                    }

                    function setBreak(newMinutes) {
                        if (newMinutes <= 0) return;

                        scope.minutes = newMinutes;
                        scope.$apply();
                    }
                }
            },
            template: '{{ minutes }}`'
        };
    }

})();