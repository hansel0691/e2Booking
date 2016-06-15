(function () {
    'use strict';

    angular.module('e2.runtime')
    	.config(routeConfig);

    /** @ngInject */
    function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
        $urlRouterProvider.otherwise('/introduction');
    }

})();
