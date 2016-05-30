(function () {
    "use strict";

    angular
        .module('app')
        .directive('hallDropzone', hallDropzone);

    function hallDropzone() {
        return {
            restrict: 'E',
            scope: {
                'hdId': '@'
            },
            link: function (scope, hallDropzone, attrs) {
                let times = document.querySelector('.times'),
                    timesWidth = times.scrollWidth;

                hallDropzone.css('width', timesWidth + 'px');

                scope.$watch(function () {
                    return hallDropzone[0].querySelectorAll('showtime').length
                }, function (count) {
                    if (count > 0)
                        hallDropzone.addClass('dropzone-mod_active');
                    else
                        hallDropzone.removeClass('dropzone-mod_active');
                });
            }
        };
    }

})();