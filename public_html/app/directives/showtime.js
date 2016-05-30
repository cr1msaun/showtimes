(function () {
    "use strict";

    angular
        .module('app')
        .directive('showtime', showtime);

    showtime.$inject = ['$document'];

    function showtime($document) {
        return {
            restrict: 'E',
            scope: {
                'sId': '@',
                'mId': '@',
                'draggingFromSidebar': '@',
                'name': '@',
                'duration': '@',
                'format': '@',
                'break': '@',
                'startTime': '@',
                'endTime': '@'
            },
            templateUrl: '/app/directives/showtime.template.html',
            link: function (scope, showtime, attrs) {

                scope.destroy = destroy;
                
                scope.$watch('duration', setDuration);
                scope.$watch('startTime', setPositionByTime);

                showtime.on('mousedown', dragWithinDropzone);

                if (scope.draggingFromSidebar !== undefined) {
                    // TODO: make proper start moving
                    //moveElement(event);

                    $document.on('mousemove', draggingFromSidebar);
                    showtime.on('mouseup', createOrDestroy);
                }

                /* ===== INTERNAL METHODS ===== */
                function draggingFromSidebar(event) {
                    moveElement(event);

                    let dropzone = isOverHallDropzone(event);

                    if (!dropzone) return;

                    dropzone.appendChild(showtime[0]);
                    scope.$apply();

                    // если перетащили на полоску зала, убираем события и обрабатываем как перемещение внутри зала
                    $document.off('mousemove');
                    showtime.off('mouseup');

                    let showtimesBlock = document.querySelector('.showtimes');

                    // устанавливаем позицию по курсору относительно зала
                    setPosition((event.pageX + showtimesBlock.scrollLeft) - dropzone.offsetLeft - showtime[0].clientWidth / 2);

                    dragWithinDropzone(event);
                }

                function createOrDestroy(event) {
                    if (!isOverHallDropzone(event)) destroy();

                    $document.off('mousemove');
                    showtime.off('mouseup');
                }



                function setDuration(newDuration) {
                    showtime[0].querySelector('.showtime').style.width = newDuration * 2 + 'px';
                }

                function dragWithinDropzone(event) {
                    scope.$watch(function() {
                            return showtime.css('left');
                        },
                        function (n) {
                            scope.startTime = getTimeByPosition(n);

                            let [startHours, startMinutes] = scope.startTime.split(':');

                            var date = new Date();
                            date.setHours(startHours);
                            date.setMinutes(parseInt(startMinutes) + parseInt(scope.duration));

                            scope.endTime = sanitizeTime(date.getHours()) + ':' + sanitizeTime(date.getMinutes());
                        },
                        true
                    );

                    var initPos = event.pageX,
                        initLeft = getPosition();

                    $document.on('mousemove', function (event) {
                        var curPos = event.pageX;
                        var diff = curPos - initPos;

                        setPosition(initLeft + diff);
                    });

                    $document.on('mouseup', function (event) {
                        let endPos = getPosition();

                        setPosition(Math.round(endPos / 10) * 10);
                        scope.$apply();

                        $document.off('mousemove');
                        showtime.off('mouseup');
                    });
                }

                function destroy() {
                    showtime.remove();
                    scope.$destroy();
                }

                function moveElement(event) {
                    showtime.css({
                        left: event.pageX - showtime[0].offsetWidth / 2 + 'px',
                        top: event.pageY - showtime[0].offsetHeight / 2 + 'px'
                    });
                }

                function isOverHallDropzone(event) {
                    showtime[0].style.display = 'none';
                    var elem = document.elementFromPoint(event.clientX, event.clientY);
                    showtime[0].style.display = '';

                    // такое возможно, если курсор мыши "вылетел" за границу окна
                    if (elem === null) {
                        return null;
                    }

                    return elem.closest('hall-dropzone');
                }

                function setPositionByTime(time) {
                    if (time === undefined) return;

                    let [hours, minutes] = time.split(':');

                    hours = parseInt(hours);
                    minutes = parseInt(minutes);

                    let initiateHour = 5;

                    if (hours < 5)
                        hours = hours + 24;

                    setPosition((hours - initiateHour) * (60 * 2) + minutes * 2);
                }

                function setPosition (newValue) {
                    if (newValue < 0)
                        newValue = 0;

                    showtime.css('left', newValue + 'px');
                }

                function getPosition() {
                    return parseInt(showtime[0].style.left);
                }

                function getTimeByPosition(position) {
                    position = parseInt(position);

                    if (position < 0) return;

                    let hours = Math.floor((position + (60 * 2) * 5) / (60 * 2));
                    let minutes = Math.floor((position % (60 * 2)) / 2);

                    if (hours >= 24)
                        hours = hours - 24;

                    hours = sanitizeTime(hours);
                    minutes = sanitizeTime(minutes);
                    
                    return hours + ':' + minutes;
                }

                function sanitizeTime(time) {
                    if (time < 10)
                        return '0' + time;

                    return time;
                }
            }
        };
    }

})();