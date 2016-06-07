'use strict';

/**
 * @ngdoc function
 * @name myBiApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the myBiApp
 */
angular.module('myBiApp')
.controller('ProfileCtrl', function ($scope, userDetailsService, commonService) {
    $scope.setLoading(true);
    userDetailsService.userPromise.then(function (response) {
        $scope.setLoading(false);
        $scope.userObject = response[0];
        $scope.userPicUrl = commonService.prepareUserProfilePicUrl($scope.userObject.uid);
    });
});
