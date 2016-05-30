(function () {
    "use strict";

    angular
        .module('app')
        .config(DateLocaleProvider);

    function DateLocaleProvider($mdDateLocaleProvider) {
        $mdDateLocaleProvider.firstDayOfWeek = 1;

        $mdDateLocaleProvider.days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
        $mdDateLocaleProvider.shortDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

        $mdDateLocaleProvider.formatDate = function(date) {
            //return $filter('date')(new Date(date), "yyyy-MM-dd");
            return moment(date).format('YYYY-MM-DD');
        };
    }

})();