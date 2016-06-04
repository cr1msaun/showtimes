(function () {
    "use strict";
    
    angular
        .module('app')
        .controller('AppCtrl', AppCtrl);
    
    AppCtrl.$inject = ['$scope', 'AppSvc'];
    
    function AppCtrl($scope, AppSvc) {
        var self = this;

        self.logout = logout;
        
        function logout() {
            AppSvc.logout();
        }
    }
    
})();