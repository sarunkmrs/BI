'use strict';

/**
 * @ngdoc function
 * @name myBiApp.controller:ReportsdashboardCtrl
 * @description
 * # ReportsdashboardCtrl
 * Controller of the myBiApp
 */
angular.module('myBiApp')
.controller('ReportsdashboardCtrl', function ($scope, reportsMenu) {

    reportsMenu.all().then(function () {
        $scope.operationDashboardLink = reportsMenu.operationalLink;
    });

    /*var url, tileData;
     $scope.setLoading(true);
     $scope.tileData = {};
     if ($scope.user_role && $scope.user_role.selected && $scope.user_role.selected === 'Rep') {
     url = 'BITool/reportTile/reportDashboard/reports/Manasa';
     }
     else if($scope.user_role && $scope.user_role.selected){
     url = 'BITool/reportTile/reportDashboard/reports/role/'+$scope.user_role.selected;
     }
     $http.get(url).success(function(response){
     $scope.setLoading(false);
     tileData = response;
     updateTileContainer(response);

     });

     function updateTileContainer(response) {
     $scope.tileData.listViews = _.chain(response)
     .map(function(eachTile){
     return eachTile.linkTitle;
     })
     .uniq()
     .value();
     $scope.selectedTileView = $scope.tileData.listViews[0];

     updateViewTiles($scope.selectedTileView);

     }


     function updateViewTiles(view) {
     if ( tileData.length > 0) {
     $scope.tilesForViews = _.chain(tileData)
     .filter(function(eachTile){
     return eachTile.link !== 'Under Construction';
     }) 
     .map(function(eachTile){
     //eachTile.linkTitle = view
     var color = '#'; // hexadecimal starting symbol

     var letters = ['1CAEE8','1694B6','974815', '84BE48', '4C7324', '465625'];

     color += letters[Math.floor(Math.random() * letters.length)];
     eachTile.backGroundColor = color;
     return eachTile;
     })
     .filter(function(eachTile){
     return eachTile.linkTitle === view;
     })
     .groupBy('bigroup')
     .map(function(eachGroup, key){
     var obj = {};
     obj.tileTitle = key;
     obj.tileBody = eachGroup;
     return obj;
     })
     .value();
     //console.log('test');
     }
     }

     $scope.randomColor = function() {
     var color = '#'; // hexadecimal starting symbol

     var letters = ['#1CAEE8','#1694B6','#974815', '#84BE48', '#4C7324', '#465625'];

     color += letters[Math.floor(Math.random() * letters.length)];

     return letters;

     };

     $scope.updateSelectedView = function(view){
     $scope.selectedTileView = view;
     updateViewTiles(view);
     };

     $scope.$on('changeRole', function(event, args){
     $scope.setLoading(true);
     $http.get('BITool/reportTile/reportDashboard/reports/role/'+args).success(function(response){
     $scope.setLoading(false);
     tileData = response;
     updateTileContainer(response);

     });  
     });
     */

    /*   $scope.openPrompts = function (size) {

     var modalInstance = $modal.open({
     animation: false,
     templateUrl: 'views/prompts.html',
     controller: 'PromptsCtrl',
     size: size,
     resolve: {
     items: function () {
     return $scope.reports;
     }
     }
     });
     }; */
});
