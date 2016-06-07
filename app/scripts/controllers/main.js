'use strict';

/**
 * @ngdoc function
 * @name myBiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myBiApp
 */
angular.module('myBiApp')
.controller('MainCtrl', function ($scope, newsService, reportSummaryService, $q, carouselService, popularSearchService, $http, commonService, reportsFactory, userDetailsService, $window, $timeout, $animate) {
    $scope.myInterval = 6000;
    $scope.noWrapSlides = false;
    $scope.carouselData = [];
    $scope.activeTab = 0;
    $scope.personaInfo = {};
    $scope.ieFlag = true;
    $scope.winFocus = false;
    
    /**
    *Update my level indication
    */
    $scope.myLevel = {
        'step1': 'active',
        'step2': 'disabled',
        'step3': 'disabled',
        'step4': 'disabled'
    };

    $scope.panelMostViewedReports = {
        'title' : 'Most Viewed Reports',
        'open' : true,
        'limit' : 4,
        'class_names' : 'col-lg-3 col-md-4 col-sm-4 col-xs-6 report-tile'
    };

    $scope.panelRRReports = {
        'title' : 'Recommended Reports',
        'open' : true,
        'limit' : 4,
        'class_names' : 'col-lg-3 col-md-4 col-sm-4 col-xs-6 report-tile',
        'viewMoreUiLink' : 'reports.list',
        'rr' : true
    };

    $scope.panelFavoriteReports = {
        'title' : 'Favorite Reports',
        'open' : true,
        'limit' : 4,
        'class_names' : 'col-lg-3 col-md-4 col-sm-4 col-xs-6 report-tile',
        'viewMoreUiLink' : 'favorites'
    };


    $scope.setLoading(true);

    $q.all([reportSummaryService.getReportSummary(), newsService, carouselService, popularSearchService, $scope.biGroup.all(), userDetailsService.userPromise]).then(function(response){
        $scope.personaInfo = response[5][0].personaInfo;
        $scope.setLoading(false);
        $scope.newsData = response[1];
        $scope.panelMostViewedReports.data = response[0].mostViewedReports;
        $scope.panelFavoriteReports.data = response[0].favoriteReports;
        $scope.panelRRReports.data = response[0].recentViewedReports;
        $scope.carouselData = response[2];
        $scope.words = response[3];
        //      var groupid = $scope.biGroup.biGroupId;
        //      var groupService = new reportsFactory.reportsFactoryFunction('group', groupid);
        //      groupService.loadReports().then(function(){
        //        $scope.panelRRReports.data = groupService.reports;
        //      });
        /**
         * Update my level indication
         */
        var userdetails = response[5][0];
        if (userdetails.userinfo.badge === 'Bronze') {
            $scope.myLevel.step1 = 'active';
        } else if (userdetails.userinfo.badge === 'Silver') {
            $scope.myLevel.step1 = 'complete';
            $scope.myLevel.step2 = 'active';
        } else if (userdetails.userinfo.badge === 'Gold') {
            $scope.myLevel.step1 = 'complete';
            $scope.myLevel.step2 = 'complete';
            $scope.myLevel.step3 = 'active';
        } else if (userdetails.userinfo.badge === 'Platinum') {
            $scope.myLevel.step1 = 'complete';
            $scope.myLevel.step2 = 'complete';
            $scope.myLevel.step3 = 'complete';
            $scope.myLevel.step4 = 'active';
        }

    });

    $scope.showMyIndication = false;
    $scope.collapseMyIndication = function () {
        $scope.showMyIndication = !$scope.showMyIndication;
    };
    
    $scope.showMostviewed = true;
    $scope.collapseMostviewed = function () {
        $scope.showMostviewed = !$scope.showMostviewed;
    };

    $scope.showTopSerches = true;
    $scope.collapseTopSerches = function () {
        $scope.showTopSerches = !$scope.showTopSerches;
    };
    
    $scope.showMyUtilization = true;
    $scope.collapseMyUtilization = function () {
        $scope.showMyUtilization = !$scope.showMyUtilization;
    };
    
    $scope.showMyActivity = true;
    $scope.collapseMyActivity = function () {
        $scope.showMyActivity = !$scope.showMyActivity;
    };
    
    $scope.showBadges = true;
    $scope.collapseBadges = function () {
        $scope.showBadges = !$scope.showBadges;
    };

    $window.onfocus = function() {
        $scope.winFocus = true;
    };
    
//    window.addEventListener("focus", function(event) {
//        $scope.winFocus = true;
//    });
    
    $scope.triggerCarousel = function() {
        //location.reload();
        if($scope.winFocus) {
            $scope.ieFlag = false;
            $timeout(function() {
                $scope.ieFlag = true;
            }, 1000);
            $scope.winFocus = false;
        }
    };
    
//    var userAgent = $window.navigator.userAgent;
//    var browsers = {chrome: /chrome/i, safari: /safari/i, firefox: /firefox/i, ie: /internet explorer/i};
//
//    for(var key in browsers) {
//        if (browsers[key].test(userAgent)) {
//            return key;
//        }
//    };
    
//    window.addEventListener("focus", function(event) {
//        // $window.location.reload();
//        // location.reload();
//        console.log("focused");
//        if(key === 'ie') {
//            $scope.ieFlag = false;
//            
//            $timeout(function() {
//                $scope.ieFlag = true;
//            }, 1000);
//        }    
//    }
});