(function () {
    "use strict";
    
    angular
        .module('app')
        .controller('AppCtrl', AppCtrl);
    
    AppCtrl.$inject = ['$scope', '$state', '$stateParams', '$mdToast', 'PlanningSvc'];
    
    function AppCtrl($scope, $state, $stateParams, $mdToast, PlanningSvc) {
        var self = this;

        
    }
    
})();