(function () {
    'use strict';

    angular.module('e2.runtime.booking')
      .controller('BookingsController', ['$rootScope', '$scope', '$state', 'BookingService', BookingsController]);

    /** @ngInject */
    function BookingsController($rootScope, $scope, $state, BookingService) {

        var vm = this;
        vm.goToBooking = goToBooking;

        activate();

        //@activate
        function activate(){

            BookingService.getBookingsGridSettings().then(function (response) {

                vm.gridOptions = response;
                $rootScope.setGridProperties(vm.gridOptions, transportRead);

            });
        }


        //@transportRead
        function transportRead(options) {

            //set params object from paramterMap.
            var params = vm.gridOptions.dataSource.transport.parameterMap(options.data, 'read');

            var pageIndex = 0;
            var pageSize = 10;

            // Service all
            BookingService.getBookings(pageIndex, pageSize).then(function (response) {
                options.success({List: response.Response, Count: response.Count});
            });

        };

        //@goToBooking
        function goToBooking(bookingId){
            var params = { bookingId: bookingId }
            $state.go("booking.form", params);
        };
    }

})();
