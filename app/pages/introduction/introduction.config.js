(function () {
  'use strict';

  angular.module('e2.runtime.introduction')
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('introduction', {
          url: '/introduction',
          templateUrl: 'app/pages/introduction/introduction.html',
          title: 'Introduction',
          sidebarMeta: {
            icon: 'ion-android-home',
            order: 0,
          },
        });
  }

})();
