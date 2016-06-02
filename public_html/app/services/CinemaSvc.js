(function () {
    "use strict";

    angular
        .module('app')
        .service('CinemaSvc', CinemaSvc);

    CinemaSvc.$inject = ['$resource'];

    function CinemaSvc($resource) {
        return $resource('/cinema/:slug', {}, {
            list: {
                method: 'GET',
                isArray: true,
                headers : {'Content-Type': 'application/json'},
                withCredentials : true,
                interceptor : {
                    response: function (response) {
                        return response.data;
                    }
                }
            },

            get: {
                method: 'GET',
                headers : {'Content-Type': 'application/json'},
                withCredentials : true,
                interceptor : {
                    response: function (response) {
                        return response.data;
                    }
                }
            }

        });
    }
    
})();