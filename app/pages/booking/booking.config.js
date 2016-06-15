(function () {
    'use strict';

    angular
        .module('e2.runtime.booking')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('booking', {
                url: '/booking',
                template : '<ui-view></ui-view>',
                abstract: false,
                title: 'Booking System',
                sidebarMeta: {
                    icon: 'ion-grid',
                    order: 300,
                },
            })
            .state('booking.list', {
              url: '/bookings',
              templateUrl: 'app/pages/booking/list/bookings.tmpl.html',
              title: 'Booking List',
              controller: 'BookingsController',
              controllerAs: 'vm',
              sidebarMeta: {
                order: 100,
              },
            })
            .state('booking.form', {
              url: '/bookings/:bookingId',
              templateUrl: 'app/pages/booking/list/booking.tmpl.html',
              title: 'Booking Form',
              controller: 'BookingController',
              controllerAs: 'vm'
            });

    }
})();
