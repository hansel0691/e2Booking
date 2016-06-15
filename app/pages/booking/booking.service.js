(function () {
    'use strict';

    angular
        .module('e2.runtime.booking')
        .factory('BookingService', BookingService);

    /* @ngInject */
    function BookingService($http, $q, API_CONFIG) {

        var serviceBase = API_CONFIG.url;
        var bookingServiceFactory = {};


        //Booking

        var _getBookings = function (pageIndex, pageSize) {
            // do API call 
            var deferred = $q.defer();
            // http get call with params.
            $http.post(serviceBase + 'api/booking/SearchBooking?pageIndex='+pageIndex+'&maxRow=' + pageSize).success(function (response) {
                deferred.resolve(response);
            }).error(function (err, status) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        //_bookingById
        var _bookingById = function (params) {
            var deferred = $q.defer();

            // http get call with params.
            $http.get(serviceBase + 'api/booking/GetBookingById', { params: params }).success(function (response) {
                deferred.resolve(response);
            }).error(function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        //_createBooking
        var _createBooking = function (booking) {
            // do API call 
            var deferred = $q.defer();

            // http get call with params.
            $http.post(serviceBase + '', booking).success(function (response) {
                deferred.resolve(response);
            }).error(function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        //_updateBooking
        var _updateBooking = function (booking) {
            var deferred = $q.defer();

            // http get call with params.
            $http.put(serviceBase + '', booking).success(function (response) {
                deferred.resolve(response);
            }).error(function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        //_deleteBooking
        var _deleteBooking = function (params) {
            var deferred = $q.defer();

            // http get call with params.
            $http.delete(serviceBase + '', { params: params }).success(function (response) {
                deferred.resolve(response);
            }).error(function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        };


        //Papers

        var _getPapers = function (businessPolicyId){
            // do API call 
            var deferred = $q.defer();
            // http get call with params.
            $http.get(serviceBase + 'api/booking/GetPapers?businessPolicyId=' + businessPolicyId).success(function (response) {
                deferred.resolve(response);
            }).error(function (err, status) {
                deferred.reject(err);
            });
            return deferred.promise;
        }

        //Grid Settings

        //@_getBookingsGridSettings
        var _getBookingsGridSettings = function () {
            var deferred = $q.defer();

            // http get call with params.
            $http.get('app/pages/booking/il8n/bookings.grid.setting.json').success(function (response) {
                deferred.resolve(response); }).error(function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        //@_getFormsGridSettings
        var _getFormsGridSettings = function () {
            var deferred = $q.defer();

            // http get call with params.
            $http.get('app/pages/booking/il8n/forms.grid.setting.json').success(function (response) {
                deferred.resolve(response); }).error(function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        //@_getTaxesAndFeesGridSettings
        var _getTaxesAndFeesGridSettings = function () {
            var deferred = $q.defer();

            // http get call with params.
            $http.get('app/pages/booking/il8n/taxesAndFees.grid.setting.json').success(function (response) {
                deferred.resolve(response); }).error(function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        };

        //@_getFormsDialogGridSettings
        var _getFormsDialogGridSettings = function () {
            var deferred = $q.defer();

            // http get call with params.
            $http.get('app/pages/booking/il8n/forms.dialog.grid.setting.json').success(function (response) {
                deferred.resolve(response); }).error(function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        };



        bookingServiceFactory.getBookings = _getBookings;
        bookingServiceFactory.bookingById = _bookingById;
        bookingServiceFactory.createBooking = _createBooking;
        bookingServiceFactory.updateBooking = _updateBooking;
        bookingServiceFactory.deleteBooking = _deleteBooking;
        
        bookingServiceFactory.getPapers = _getPapers;

        bookingServiceFactory.getBookingsGridSettings = _getBookingsGridSettings;
        bookingServiceFactory.getFormsGridSettings = _getFormsGridSettings;
        bookingServiceFactory.getTaxesAndFeesGridSettings = _getTaxesAndFeesGridSettings;
        bookingServiceFactory.getFormsDialogGridSettings = _getFormsDialogGridSettings;

        return bookingServiceFactory;
    }

})();
