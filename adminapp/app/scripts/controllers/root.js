'use strict';

/**
 * @ngdoc function
 * @name myBiApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the myBiApp
 */
angular.module('adminPageApp')
.controller('RootCtrl', function ($scope, $http, $log, $q, userDetailsService, commonService, $state, $rootScope) {
    $scope.state = $state;
    $scope.displayType = 'All';
    $scope.displayForm = 'edit';
    $scope.selectedReportGroup = '';

    $scope.$on('resetDisplayType', function(event, value) {
        $scope.displayType = value;
        $scope.selectedReportGroup = '';
    });
    
    $scope.$on('resetDisplayForm', function(event, value) {
        $scope.displayForm = value;
    });
    
    userDetailsService.userPromise.then(function (userObject) {
        $rootScope.userObject = $scope.userObject = userObject[0];
        $scope.userPicUrl = commonService.prepareUserProfilePicUrl($scope.userObject.uid);
        var url;
        
        if ($scope.userObject.userinfo && $scope.userObject.userinfo.role.toLowerCase() === 'admin' ) {
            url = 'BITool/buAdmin/getBUAdminGroup/?userName=';
        } else if ($scope.userObject.userinfo && $scope.userObject.userinfo.role.toLowerCase() === 'buadmin') {
            url = 'BITool/buAdmin/getBIGroupForBUAdmin/?userName=';
        }
        
        url = url+$scope.userObject.emcLoginName;
        
        $http.get(url).then(function(resp){
            $scope.reportGroup = resp.data;
        });
    });

    /**
     * Common Search in all pages
     */
    $scope.submitSearch = function (stateName) {
        if (stateName === 'contents' || stateName === 'external' || stateName === 'administration.list.manageExternal') {
            $scope.selectedFuncArea = '';
            $scope.selectedOwner = '';
            $scope.selectedReportName = '';
            $scope.searchText = $scope.searchText ? $scope.searchText : '';
            $scope.$broadcast('searchTextUpdate', $scope.searchText);
        }
        else if (stateName === 'administration.list.news') {
            $scope.$broadcast('searchNews', $scope.searchText);
        }
        else if (stateName === 'administration.list.communication') {
            $scope.$broadcast('searchCommunication', $scope.searchText);
        }
        else if (stateName === 'administration.list.groups') {
            $scope.$broadcast('searchGroup', $scope.searchText);
        }
        else if (stateName === 'administration.list.levels') {
            $scope.$broadcast('searchLevel', $scope.searchText);
        }
        else if (stateName === 'administration.list.users') {
            $scope.$broadcast('searchUsers', $scope.searchText);
        }
        else if (stateName === 'administration.list.audit') {
            $scope.$broadcast('searchReportAudit', $scope.searchText);
        }
    };

    $scope.selectedFunctionalArea = function (a, b) {
        $scope.$broadcast('funcAreaUpdate', a.functionalArea);
    };

    $scope.changeReportType = function (a, b) {
        $scope.$broadcast('reportTypeUpdate', a.reportType);
    };

    $scope.changeSourceSystem = function (a, b) {
        $scope.$broadcast('sourceSystemUpdate', a.sourceSystem);
    };

    $scope.changeAuditPersona = function () {
        $scope.$broadcast('broadcastAuditPersona', $scope.selectedAuditPersona);
    };

    $scope.changeAuditGroup = function () {
        $scope.$broadcast('broadcastAuditGroup', $scope.selectedAuditGroup);
    };

    $scope.$on('emitAuditGroup', function (event, auditGroups) {
        $scope.auditGroups = auditGroups;
    });

    $scope.changeUserGroup = function () {
        $scope.$broadcast('broadcastUserGroup', $scope.selectedUserGroup);
    };

    $scope.$on('emitUserGroup', function (event, userGroup, defaultUserGroup) {
        $scope.userGroup = userGroup;
        $scope.selectedUserGroup = defaultUserGroup.groupId;
    });
    
    $scope.displayContent = function(val) {
        $scope.displayType = val;
        $scope.selectedReportGroup = '';
        resetDropdown();
        $scope.$broadcast('broadcastDeployedSelection', $scope.displayType, $scope.selectedReportGroup);
    };
    
    $scope.changeReportGroup = function() {
        $scope.$broadcast('broadcastDeployedReportGroup', $scope.displayType, $scope.selectedReportGroup);
    };
    
    $scope.showForm = function(displayForm) {
        $scope.displayForm = displayForm;
        $scope.$emit('emitDisplayForm', $scope.displayForm);
    };

    $scope.functionalAreas = [];
    $scope.reportTypes = [];
    $scope.sourceSystems = [];
    
    /**
     * Filters in content page
     */
    
    function resetDropdown() {
        $scope.selectedFuncArea = {};
        $scope.selectedSourceSystem = {};
        $scope.selectedReportType = {};
    }
    
    resetDropdown();
    
    $scope.refreshFunctionalAreas = function (fa) {
        return $scope.state.current.name === 'contents' ? $http.get('BITool/admin/getFunctionalArea/1/20', {searchText: fa}).then(function (resp) {
            $scope.functionalAreas = resp.data;
        }) : [];
    };

    $scope.refreshReportTypes = function (fa) {
        return $scope.state.current.name === 'contents' ? $http.get('BITool/admin/getReportType/1/20', {searchText: fa}).then(function (resp) {
            $scope.reportTypes = resp.data;
        }) : [];
    };

    $scope.refreshSourceSystems = function (fa) {
        return $scope.state.current.name === 'contents' ? $http.get('BITool/admin/getSourceSystem/1/20', {searchText: fa}).then(function (resp) {
            $scope.sourceSystems = resp.data;
        }) : [];
    };

    $scope.clearFilter = function (type) {
        if (type === 'func') {
            $scope.$broadcast('funcAreaUpdate', '');
            $scope.selectedFuncArea = {};

        } else if (type === 'report') {
            $scope.$broadcast('reportTypeUpdate', '');
            $scope.selectedReportType = {};
        } else if (type === 'source') {
            $scope.$broadcast('sourceSystemUpdate', '');
            $scope.selectedSourceSystem = {};
        }
    };

}).directive('errSrc', function () {
    return {
        link: function (scope, element, attrs) {
            element.bind('error', function () {
                if (attrs.src !== attrs.errSrc) {
                    attrs.$set('src', attrs.errSrc);
                }
            });
        }
    };
});