(function () {
    "use strict";

    angular
        .module('app')
        .service('PlanningSvc', PlanningSvc);

    PlanningSvc.$inject = ['$resource'];

    function PlanningSvc($resource) {
        return $resource('', {}, {

            save: {
                method: 'POST',
                url: '/save/',
                headers: {'Content-Type': 'application/json'},
                withCredentials: true,
                interceptor: {
                    response: function (response) {
                        return response.data;
                    }
                }
            },

            download: {
                method: 'GET',
                url: '/download/:cinemaId',
                headers: {'Content-Type': 'application/json'},
                withCredentials: true,
                interceptor: {
                    response: function (response) {
                        return response.data;
                    }
                }
            }

        });
    }
    
})();