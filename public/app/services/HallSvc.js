(function () {
    "use strict";

    angular
        .module('app')
        .service('HallSvc', HallSvc);

    HallSvc.$inject = ['$resource'];

    function HallSvc($resource) {
        return $resource('/hall/:action', {}, {

            list: {
                method: 'GET',
                isArray: true,
                params: {'action' : ''},
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