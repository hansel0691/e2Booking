(function () {
    'use strict';

    angular
        .module('e2.runtime.booking')
        .controller('FormsController', ['$uibModalInstance', '$rootScope', 'BookingService', FormsController]);

    /* @ngInject */
    function FormsController($uibModalInstance, $rootScope, BookingService) {
        var vm = this;

        // Load VM Methods
        vm.addSelection = addSelection;
        vm.close = close;

        // Run Constructor function
        activate();


        // @activate page
        function activate() {
            
            BookingService.getFormsDialogGridSettings().then(function (response) {
                vm.gridOptions = response;
                $rootScope.setGridProperties(vm.gridOptions, transportRead);
            });

        };

        //@transportRead
        function transportRead(options) {
        };

        // @getBookingById
        function addSelection(fee) {
            $uibModalInstance.close();
        };

        function close(){
             $uibModalInstance.dismiss('cancel');
        }

    };
})();
