'use strict';

angular.module('e2')
    .run(['$rootScope', function ($rootScope) {

            //@ _setGridProperties - Setting local function to grid setting.
            function _setGridProperties(grid, transportRead) {
                grid.dataSource.schema.data = _schemaData;
                grid.dataSource.schema.total = _schemaTotal;
                grid.dataSource.transport.parameterMap = _parameterMap;
                grid.dataSource.transport.read = transportRead;
            };

            //@_schemaData - Returns companies data.
            function _schemaData(data) {
                if (data && data.List)
                    return data.List;

                return [];
            };

            //@_schemaTotal - Returns total number of records return by service.
            function _schemaTotal(data) {
                if (data && data.Response) {
                    return data.Response;
                }
                return 0;
            };

            //@_parameterMap - Parameters for pagination and filtration
            function _parameterMap(options, operation) {
                if (operation === "read") {
                    return {
                        page: options.page,
                        skip: options.skip,
                        take: options.take,
                        pageSize: options.pageSize, filter: options.filter,
                        Sort: options.sort
                    }
                };
            };

            $rootScope.setGridProperties = _setGridProperties;
    }]);