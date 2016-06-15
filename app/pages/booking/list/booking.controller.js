(function () {
    'use strict';

    angular
        .module('e2.runtime.booking')
        .controller('BookingController', ['$rootScope', '$stateParams', '$state', '$uibModal', 'BookingService', BookingController]);

    /* @ngInject */
    function BookingController($rootScope, $stateParams, $state, $uibModal, BookingService) {
        var vm = this;

        // Load VM Methods
        vm.saveBooking = saveBooking;
        vm.goToBookings = goToBookings;
        vm.openTaxesModal = openTaxesModal;
        vm.openFormsModal = openFormsModal;       
        vm.removeTaxesItem = removeTaxesItem;

        vm.booking = {};
        vm.bookingId = null;

        vm.paperOptions = [];
        vm.underwriterTeamOptions = [];
        vm.underwriterOptions = [];
        vm.productOptions = [];
        vm.premiumTypeOptions = [{text: 'Flat', value: 0}, {text: 'Adjustable', value: 1}]; 
        vm.policyBusinessOptions = []
        vm.coverageBusinessOptions = [];
        vm.states = [];



        // Run Constructor function
        activate($stateParams.bookingId);


        // @activate page
        function activate(bookingId) {
            vm.bookingId = bookingId;

            // Set Page data
            if (bookingId)
                getBookingById(bookingId);
            else
                vm.booking = new Booking({});

            getPapers();

            BookingService.getTaxesAndFeesGridSettings().then(function (response) {
                vm.feesGridOptions = response;
                $rootScope.setGridProperties(vm.feesGridOptions, taxesRead);
            });

            BookingService.getFormsGridSettings().then(function (response) {
                vm.formsGridOptions = response;
                $rootScope.setGridProperties(vm.formsGridOptions, formsRead);
            });
        };

        //@getBookingById
        function getBookingById(bookingId) {

            var params = {
                bookingId: bookingId
            };

            BookingService.bookingById(params).then(function (response) {
                vm.booking = new Booking(response);
            });
        };

        // @saveBooking 
        function saveBooking(booking) {
            if (vm.bookingId)
                createBooking(booking);
            else
                updateBooking(booking);
        };

        // @createBooking
        function createBooking(booking) {

            BookingService.createBooking(booking).then(function (response) {

                if (response) {
                    var message = 'Saved "' + booking.InsuredName + '" booking';
                    showToast(message, "success");

                    // redirect to the grid 
                    goToBookings();
                };

            }).catch(function (err) {
                showToast(err, "error");
            });
        };

        // @updateBooking
        function updateBooking(booking) {

            BookingService.updateBooking(booking).then(function (response) {
                if (response) {
                    var message = 'Updated "' + booking.InsuredName + '" booking';
                    showToast(message, "success");

                    goToBookings();
                };
            }).catch(function (err) {
                var message = '"' + booking.InsuredName + '" was not saved';
                showToast(message, "error");
            });

        };

        // @goToBookings
        function goToBookings() {

            $state.go("booking.list");

        };

        //newBooking
        function Booking(model) {
            this.Policy = {
                Paper: model.Paper,
                InceptionDate: model.InceptionDate,
                EndDate: model.EndDate,
                PolicyNumber: model.PolicyNumber,
                TransactionNumber: model.TransactionNumber
            }

            this.Insured = {
                Name: model.Name,
                AddressLine1: model.AddressLine1,
                AddressLine2: model.AddressLine2,
                City: model.City,
                State: model.State,
                PostCode: model.PostCode
            }

            this.Broker = {
                Company: model.Company,
                Contact: model.Contact,
                Location: model.Location,
                City: model.City,
                State: model.State,
                PostalCode: model.PostalCode
            }

            this.Underwriter = {
                UnderwriterTeam: model.Underwriter,
                Underwriter: model.Underwriter
            }

            this.Section = {
                Product: model.Product,
                Premium: model.Premium,
                Terrorism: model.Terrorism,
                PremiumType: model.PremiumType,
                PolicyBusiness: model.PolicyBusiness,
                CoverageBusiness: model.CoverageBusiness,
                Amount: model.Amount
            }
        };

        // @getPapers
        function getPapers(){
            var businessPolicyId = 13;

            BookingService.getPapers(businessPolicyId).then(function (response) {
                if (!response) return;

                for (var i = 0; i < response.length; i++) {
                    var item = response[i];
                    vm.paperOptions.push({text: item.PartyCompanyName, value: item.MaxUID});
                }
            });
        }

        //@taxesRead
        function taxesRead(options) {
            vm.feesOptions = options;

            if (!vm.booking || !vm.booking.Section)
                return {List: [], Count: 0}

            var data = vm.booking.Section.Fees;
            options.success({List: data, Count: data ? data.length : 0});
        };

        //@formsRead
        function formsRead(options) {
            vm.formsOptions = options;
        };

        //@openTaxesModal
        function openTaxesModal(taxesAndFees){
              
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/booking/list/taxes.dialog.tmpl.html',
                controller: 'FeesController',
                controllerAs: 'vm',
                resolve: {
                    taxesAndFees : taxesAndFees
                }
            });

            modalInstance.result.then(function (response) {
                if(!vm.booking.Section.Fees)
                    vm.booking.Section.Fees = [];

                if (response.id)
                {
                    var index = findIndex(vm.booking.Section.Fees, response.id);
                    var item = vm.booking.Section.Fees[index];
                    item.Type = response.Type;
                    item.Amount = response.Amount;
                }
                else
                {
                    response.id = Math.floor((Math.random() * 100000) + 1);;
                    vm.booking.Section.Fees.push(response);
                }
                taxesRead(vm.feesOptions);

            });
        }

        //@removeTaxesItem
        function removeTaxesItem(taxesAndFees){
            var index  = findIndex(vm.booking.Section.Fees, taxesAndFees.id)

            if (vm.booking.Section && vm.booking.Section.Fees)
            {
                vm.booking.Section.Fees.splice(index, 1);
                taxesRead(vm.feesOptions);   
            }
        }

        //@openFormsModal
        function openFormsModal(){
              var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/booking/list/forms.dialog.tmpl.html',
                controller: 'FormsController',
                controllerAs: 'vm'
              });

            modalInstance.result.then(function (response) {
                if(!vm.booking.Section.Fees)
                    vm.booking.Section.Fees = [];
                vm.booking.Section.Fees.push(response);
                formsRead(vm.formsOptions);

            });
        }

        function findIndex(data, id){
            if (!data)
                return null;

            for (var i = 0; i < data.length; i++) 
                if (data[i].id == id)
                    return i;

        }

    };
})();
