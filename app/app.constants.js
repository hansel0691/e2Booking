'use strict';

angular.module('e2')
    .constant('API_CONFIG', {
        // set a constant for the API we are connecting to
        'url': 'http://localhost:2600/',
        'clientId': 'E2',
        'sessionTimeout': '50'
    });