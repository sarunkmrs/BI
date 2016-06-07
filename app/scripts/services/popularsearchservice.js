'use strict';

/**
 * @ngdoc service
 * @name myBiApp.popularSearchService
 * @description
 * # popularSearchService
 * Execute popular search webservice and return list of popular search's.
 */
angular.module('myBiApp')
.service('popularSearchService', function popularSearchService($http, WEBSERVICEURL, $state) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return $http.get(WEBSERVICEURL.popularSearch).then(function (resp) {
        _.map(resp.data, function (eachItem) {
            eachItem.text = eachItem.searchString;
            eachItem.weight = eachItem.searchCount;
            eachItem.handlers = {click: function () {
                $state.go('search', {'searchText': eachItem.searchString, 'Report Catalog': 'Y'});
            }};
            return eachItem;
        });
        return resp.data;
    });
});
