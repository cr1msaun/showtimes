(function () {
    "use strict";

    angular
        .module('app')
        .config(configRoutes);

    function configRoutes($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('planning', {
                url: "/:cinemaId?date",
                params: {date: null},
                templateUrl: "/app/views/planning.html",
                controller: 'PlanningCtrl as planning',
                resolve: {
                    cinema: function($stateParams, CinemaSvc) {
                        return CinemaSvc.get({slug: $stateParams.cinemaId, date: $stateParams.date}).$promise;
                    },

                    movies: function($stateParams, MovieSvc) {
                        return MovieSvc.list().$promise;
                    }
                }
            });
    }

})();