(function () {
    "use strict";
    
    angular
        .module('app')
        .controller('AppCtrl', AppCtrl);
    
    AppCtrl.$inject = ['$scope', '$state', '$stateParams', '$mdToast', 'PlanningSvc'];
    
    function AppCtrl($scope, $state, $stateParams, $mdToast, PlanningSvc) {
        var self = this;
        
        self.changeDate = changeDate;
        self.saveShowtimes = saveShowtimes;
        self.downloadShowtimes = downloadShowtimes;

        $scope.$on('$stateChangeSuccess', function ($event, newState, newParams) {
            self.date = newParams.date ? new Date(newParams.date) : new Date();
        });

        $scope.$on('setTitle', function ($event, data) {
           self.title = data.title;
        });


        /////////////////////////////
        function changeDate(newDate) {
            //var date = $filter('date')(new Date(newDate), "yyyy-MM-dd");
            var date = moment(newDate).format('YYYY-MM-DD');

            $state.go('planning', {date: date});
        }

        function saveShowtimes() {
            let data = {
                'date': moment(self.date).format('YYYY-MM-DD'),
                'cinemaId': $stateParams.cinemaId,
                'halls': {},
                'movies': {}
            };

            // формируем массив фильмов
            let halls = document.querySelectorAll('hall-dropzone');

            for (let i = 0; i < halls.length; i++) {
                let hall = halls[i];
                let hallScope = angular.element(hall).isolateScope();

                let showtimes = hall.querySelectorAll('showtime');
                let showtimesData = [];

                for (let j = 0; j < showtimes.length; j++) {
                    let showtime = angular.element(showtimes[j]);
                    let scope = showtime.isolateScope();
                    let breakScope = angular.element(showtime[0].querySelector('break')).isolateScope();

                    let showtimeData = {
                        'sId': scope.sId,
                        'mId': scope.mId,
                        'name': scope.name,
                        'start_time': scope.startTime,
                        'end_time': scope.endTime,
                        'duration': scope.duration,
                        'break': breakScope.minutes,
                        'format': scope.format
                    };

                    showtimesData.push(showtimeData);
                }

                data.halls[hallScope.hdId] = showtimesData;
            }

            // формируем массив фильмов и сохраняем их продолжительность
            let movies = document.querySelectorAll('movie');

            for (let i = 0; i < movies.length; i++) {
                let scope = angular.element(movies[i]).isolateScope();

                data.movies[scope.mId] = scope.duration;
            }

            PlanningSvc.save(data, function () {
                $mdToast.show({
                    template: '<md-toast><div class="md-toast-content" layout="column" layout-align="center">Сохранено успешно!</div></md-toast>',
                    position: 'top center'
                });
            });
        }

        function downloadShowtimes(date) {
            var date = moment(date).format('YYYY-MM-DD');

            PlanningSvc.download({cinemaId: $stateParams.cinemaId, date: date}, function (data) {
                window.location = '/files/' + data;
            });
        }
    }
    
})();