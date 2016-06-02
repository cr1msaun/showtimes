(function () {
    "use strict";

    angular
        .module('app')
        .config(configRoutes);

    function configRoutes($stateProvider, $urlRouterProvider, $locationProvider) {

        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('dashboard', {
                url: "/",
                templateUrl: "/app/views/dashboard.html",
                controller: 'DashboardCtrl as dashboard'
            })
            
            .state('settings', {
                url: "/settings",
                templateUrl: "/app/views/settings.html",
                controller: 'SettingsCtrl as settings',
                resolve: {
                    cinemas: function($stateParams, CinemaSvc) {
                        return CinemaSvc.list().$promise;
                    }
                }
            })
            
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
        
        $locationProvider.html5Mode(true);
    }

})();