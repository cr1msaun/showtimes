(function () {
    "use strict";

    angular
        .module('app')
        .controller('AddMovieCtrl', AddMovieCtrl);

    AddMovieCtrl.$inject = ['$scope', '$mdBottomSheet', 'MovieSvc'];

    function AddMovieCtrl($scope, $mdBottomSheet, MovieSvc) {

        $scope.addMovie = addMovie;

        function addMovie(newMovie) {
            MovieSvc.add(newMovie, function (newMovie) {
                $mdBottomSheet.hide(newMovie);
            });
        }
    }

})();