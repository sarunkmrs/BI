'use strict';

/**
 * @ngdoc service
 * @name myBiApp.newsService
 * @description
 * # newsService
 * Service in the myBiApp.
 */
angular.module('myBiApp')
  .service('newsService', function newsService($http, commonService) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    
    var news = $http.get(commonService.prepareGetNewsUrl(1,5)).then(function(resp){
        return resp.data;    
    });
    
    return news;

    /*var defer = $q.defer();
    this.newsData = defer.promise;
    
    defer.resolve({
        news: [
            {
                title: "What Synergies Does the Dell-EMC Merger Bring?",
                desc: "In the pervious part of the series, we saw that the Dell-EMC."
            },
            {
                title: "What Synergies Does the Dell-EMC Merger Bring?",
                desc: "In the pervious part of the series, we saw that the Dell-EMC."
            },
            {
                title: "What Synergies Does the Dell-EMC Merger Bring?",
                desc: "In the pervious part of the series, we saw that the Dell-EMC."
            }
        ]    
    });*/
    
    
  });
