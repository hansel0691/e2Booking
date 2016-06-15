(function () {
    'use strict';

    angular
        .module('e2.runtime.booking')
        .controller('FeesController', ['$uibModalInstance', 'taxesAndFees', 'BookingService', FeesController]);

    /* @ngInject */
    function FeesController($uibModalInstance, taxesAndFees, BookingService) {
        var vm = this;

        // Load VM Methods
        vm.addFee = addFee;
        vm.close = close;

        vm.fee = null;
        vm.feesOptions = [{text: 'Value 1', value: 'Value 1'}, {text: 'Value 2', value: 'Value 2'}];

        // Run Constructor function
        activate(taxesAndFees);

        // @activate page
        function activate(taxesAndFees) {

            if (taxesAndFees)
                vm.fee = new TaxesAndFee(taxesAndFees);   
            else
                vm.fee = new TaxesAndFee({});
        };

        // @getBookingById
        function addFee(fee) {
            $uibModalInstance.close(fee);
        };

        //@close
        function close(){
             $uibModalInstance.dismiss('cancel');
        }

        function TaxesAndFee(model){
            this.id = model.id;
            this.Type = model.Type;
            this.Amount = model.Amount
        }

    };
})();
