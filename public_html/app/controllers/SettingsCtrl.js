(function () {
    "use strict";
    
    angular
        .module('app')
        .controller('SettingsCtrl', SettingsCtrl);

    SettingsCtrl.$inject = ['$scope', 'cinemas'];
    
    function SettingsCtrl($scope, cinemas) {
        var self = this;
        
        self.cinemas = cinemas;
    }
    
})();