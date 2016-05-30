(function () {
    "use strict";

    angular
        .module('app')
        .service('CinemaSvc', CinemaSvc);

    CinemaSvc.$inject = ['$resource'];

    function CinemaSvc($resource) {
        return $resource('/cinema/:slug', {}, {

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