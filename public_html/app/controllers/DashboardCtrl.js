(function () {
    "use strict";
    
    angular
        .module('app')
        .controller('DashboardCtrl', DashboardCtrl);

    DashboardCtrl.$inject = ['$scope', 'cinemas'];
    
    function DashboardCtrl($scope, cinemas) {
        var self = this;

        self.cinemas = cinemas;
    }
    
})();