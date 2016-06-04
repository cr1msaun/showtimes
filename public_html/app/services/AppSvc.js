(function () {
    "use strict";

    angular
        .module('app')
        .service('AppSvc', AppSvc);

    AppSvc.$inject = ['$resource', '$window'];

    function AppSvc($resource, $window) {
        return $resource('/api/:action', {}, {

            logout: {
                method: 'GET',
                params: {'action' : 'logout'},
                headers : {'Content-Type': 'application/json'},
                withCredentials : true,
                interceptor : {
                    response: function (response) {
                        $window.location.href = '/';
                    }
                }
            }

        });
    }
    
})();