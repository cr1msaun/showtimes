(function () {
    "use strict";
    
    angular
        .module('app')
        .controller('PlanningCtrl', PlanningCtrl);

    PlanningCtrl.$inject = ['$scope', '$stateParams', '$state', '$mdBottomSheet', 'PlanningSvc', 'cinema', 'movies'];
    
    function PlanningCtrl($scope, $stateParams, $state, $mdBottomSheet, PlanningSvc, cinema, movies) {
        var self = this;

        self.cinema = cinema;
        self.movies = movies;
        
        self.showMovieForm = showMovieForm;

        $scope.$emit('setTitle', {
            title: 'Репертуарное планирование - кинотеатр "' + self.cinema.name + '"'
        });

        function showMovieForm() {
            $mdBottomSheet.show({
                templateUrl: '/app/views/addMovieForm.html',
                parent: '.sidebar',
                controller: 'AddMovieCtrl'
            }).then(function (newMovie) {
                self.movies.push(newMovie);
            });
        }
        
        // TODO: make into a directive
        document.querySelector('.showtimes').scrollLeft = 300;
        /////////////////////////////

    }
    
})();