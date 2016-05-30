(function () {
    "use strict";

    angular
        .module('app')
        .service('MovieSvc', MovieSvc);

    MovieSvc.$inject = ['$resource'];

    function MovieSvc($resource) {
        return $resource('/movie/:slug', {}, {

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
            
            add: {
                method: 'POST',
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