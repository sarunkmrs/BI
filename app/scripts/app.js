'use strict';

/**
 * @ngdoc overview
 * @name myBiApp
 * @description
 * # myBiApp
 *
 * Main module of the applications. {@link
 * myBiApp.controller:MainCtrl MainCtrl}
 */
angular
.module('myBiApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'nvd3',
    'ui.bootstrap',
    'underscore',
    'ui.grid',
    'ui.router',
    'infinite-scroll',
    'angular-jqcloud',
    'angularTreeview',
    'ncy-angular-breadcrumb'
])
.constant('CONFIG', {
    viewDir: 'views/',
    limit: 20,
    tableauImagesPath: 'PreviewImages/',
    API: {
        //Set useMocks to true to simulate/mock actual webservice.
        useMocks: true,
        fakeDelay: 800,
        //baseUrl: 'http://bipdurdev01.corp.emc.com/',
        baseUrl: '/'
    }
})
.config(function (CONFIG, $provide) {
    //Only load mock data, if config says so
    if (!CONFIG.API.useMocks) {
        return;
    }
    //Decorate backend with awesomesauce
    $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
})
.config(function (CONFIG, $httpProvider, $breadcrumbProvider) {
    $breadcrumbProvider.setOptions({
        prefixStateName: 'home',
        template: 'bootstrap2'
    });

    $httpProvider.interceptors.push(function ($q, $timeout, CONFIG, $rootScope) {
        /**
         * Function which add new params to url 
         * To avoid caching in IE get request.
         */
        function addUrlParam(url, key, value) {
            var newParam = key + '=' + value;
            var result = url.replace(new RegExp('(&|\\?)' + key + '=[^\&|#]*'), '$1' + newParam);
            if (result === url) {
                result = (url.indexOf('?') !== -1 ? url.split('?')[0] + '?' + newParam + '&' + url.split('?')[1]
                        : (url.indexOf('#') !== -1 ? url.split('#')[0] + '?' + newParam + '#' + url.split('#')[1]
                                : url + '?' + newParam));
            }
            return result;
        }
        return {
            'request': function (config) {
                if(config.url.indexOf('https://') > -1 || config.url.indexOf('http://') > -1) {
                    config.url = config.url;
                } else {
                    if (config.url.indexOf(CONFIG.viewDir) !== 0 && config.url.indexOf('directives') !== 0 && config.url.indexOf('uib') !== 0 && config.url.indexOf('template') !== 0 && config.url.indexOf('ui-grid') !== 0) {
                        config.url = addUrlParam(CONFIG.API.baseUrl + config.url, '_', Date.now());

                    }    
                }
                
                return config;
            },
            'requestError': function (rejection) {
                var modalContent;
                if (rejection.status === 0) {
                    modalContent = {
                        title: 'SSO timed out',
                        message: 'Please log into SSO again before continuing',
                        ok: false,
                        cancel: {text: 'OK', callback: function () {
                            }}
                    };


                    $rootScope.$broadcast('ShowUserAlert', modalContent);
                } else {
                    modalContent = {
                        title: 'Webservice: HTTP error',
                        message: rejection.data,
                        ok: false,
                        cancel: {text: 'OK', callback: function () {
                            }}
                    };


                    $rootScope.$broadcast('ShowUserAlert', modalContent);
                }
                return $q.reject(rejection);
            },
            'responseError': function (rejection) {
                var modalContent;
                if (rejection.status === 0) {
                    modalContent = {
                        title: 'SSO timed out',
                        message: 'Please log into SSO again before continuing',
                        ok: false,
                        cancel: {text: 'OK', callback: function () {
                            }}
                    };

                    $rootScope.$broadcast('ShowUserAlert', modalContent);
                } else {
                    if (rejection.status === 404 || rejection.status === 403) {
                    } else {
                        modalContent = {
                            title: 'Webservice: HTTP error',
                            message: rejection.data,
                            ok: false,
                            cancel: {text: 'OK', callback: function () {
                                }}
                        };
                        $rootScope.$broadcast('ShowUserAlert', modalContent); 
                    }
                }
                return $q.reject(rejection);
            }
        };
    });
})
.constant('regexEscape', function regEsc(str) {
    //Escape string to be able to use it in a regular expression
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
})
.config(function ($routeProvider, $stateProvider, $urlRouterProvider) {
    // use the HTML5 History API & set HTM5 mode true
    //$locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            data: {
                displayName: 'Home',
                subCaption: 'Welcome to Insights',
                classIcon: 'home-header-icon',
                breadcrumName: 'Home'
            },
            ncyBreadcrumb: {
                label: 'Home'
            }
        })
        .state('search', {
            url: '/search/:persona?searchText',
            templateUrl: 'views/search.html',
            controller: 'SearchCtrl',
            data: {
                displayName: 'Search',
                subCaption: '',
                classIcon: 'search-header-icon',
            },
            ncyBreadcrumb: {
                label: 'Search'
            }
        })
        .state('search.details', {
            url: '/:searchId/:sourceReportId/:sourceName',
            abstract: true,
            data: {
                displayName: 'Search',
                subCaption: '',
                classIcon: 'recommended-header-icon',
            }
        })
        .state('search.details.report', {
            url: '/report',
            views: {'@': {
                    templateUrl: 'views/report1.html',
                    controller: 'SearchdetailsCtrl'
                }
            },
            data: {
                displayName: 'Search',
                subCaption: '',
                classIcon: 'recommended-header-icon',
            },
            ncyBreadcrumb: {
                label: 'Search'
            }
        })
        .state('search.details.about', {
            url: '/about',
            views: {'@': {
                    templateUrl: 'views/search.about.html',
                    controller: 'SearchdetailsCtrl'
                }
            },
            data: {
                displayName: 'Search',
                subCaption: '',
                classIcon: 'recommended-header-icon',
            },
            ncyBreadcrumb: {
                label: 'Search'
            }
        })
        .state('search.details.access', {
            url: '/access',
            views: {'@': {
                    templateUrl: 'views/search.access.html',
                    controller: 'SearchdetailsCtrl'
                }
            },
            data: {
                displayName: 'Search',
                subCaption: '',
                classIcon: 'recommended-header-icon',
            },
            ncyBreadcrumb: {
                label: 'Search'
            }
        })
        .state('search.details.feedback', {
            url: '/feedback',
            views: {'@': {
                    templateUrl: 'views/search.feedback.html',
                    controller: 'SearchdetailsCtrl'
                }
            },
            data: {
                displayName: 'Search',
                subCaption: '',
                classIcon: 'recommended-header-icon',
            },
            ncyBreadcrumb: {
                label: 'Search'
            }
        })
        .state('reportsDashboard', {
            url: '/reportsDashboard',
            templateUrl: 'views/reportsDashboard.html',
            controller: 'ReportsdashboardCtrl',
            data: {
                displayName: 'Operational Dashboard',
                subCaption: '',
                classIcon: 'operation-header-icon',
                breadcrumName: 'Operational Dashboard'
            },
            ncyBreadcrumb: {
                label: 'Operational Dashboard'
            }
        })
        .state('favorites', {
            url: '/favorites',
            templateUrl: 'views/favorites.html',
            controller: 'favoritesCtrl',
            data: {
                displayName: 'My Favorites',
                subCaption: '',
                classIcon: 'myfavorites-header-icon',
                breadcrumName: 'My Favorites'
            },
            ncyBreadcrumb: {
                label: 'My Favorites'
            }
        })
        .state('profile', {
            url: '/profile',
            templateUrl: 'views/myprofile.html',
            controller: 'ProfileCtrl',
            data: {
                displayName: 'My Profile',
                subCaption: '',
                classIcon: 'myprofile-header-icon',
                breadcrumName: 'My Profile'
            },
            ncyBreadcrumb: {
                label: 'My Profile'
            }
        })
        .state('reports', {
            url: '/reports',
            abstract: true,
            templateUrl: 'views/reports.html',
            controller: 'ReportsCtrl',
            /*resolve: {
             reportsMenuResolve: ['reportsMenu',
             function( reportsMenu){
             return reportsMenu.all();
             }]
             },*/

        })
        .state('reports.list', {
            url: '',
            views: {'report': {
                    templateUrl: 'views/reports.list.html',
                    controller: function ($scope) {
                        $scope.access.allReports();
                    }
                }},
            data: {
                displayName: 'Available Reports',
                subCaption: '',
                classIcon: 'recommended-header-icon',
                breadcrumName: 'Available Reports'
            },
            ncyBreadcrumb: {
                label: 'Available Reports'
            }

        })
        .state('reports.details', {
            url: '/{levelId:[0-9]{1,10}}',
            views: {'report': {
                    templateUrl: 'views/reports.list.level.html',
                    controller: function ($scope, $stateParams) {
                        $scope.access.subGroupItems($stateParams.levelId);
                    }

                }
            },
            data: {
                displayName: 'Available Reports',
                subCaption: '',
                classIcon: 'recommended-header-icon',
                breadcrumName: '{{displayNameb}}'
            },
            ncyBreadcrumb: {
                label: '{{displayNameb}}'
            }
        })

        .state('reports.details.report', {
            url: '/{reportId:[0-9]{1,10}}',
            abstract: true,
            data: {
                displayName: 'Available Reports',
                subCaption: '',
                classIcon: 'recommended-header-icon',
                breadcrumName: '{{reportName}}'
            },
            ncyBreadcrumb: {
                label: '{{reportName}}'
            }

        })
        .state('reports.details.report.report', {
            url: '/report',
            views: {'report@reports': {
                    templateUrl: 'views/report1.html',
                    controller: 'ReportCtrl'
                }
            },
            data: {
                displayName: 'Available Reports',
                subCaption: '',
                classIcon: 'recommended-header-icon',
                breadcrumName: '{{reportName}}'
            },
            ncyBreadcrumb: {
                label: '{{reportName}}'
            }

        })
        .state('reports.details.report.about', {
            url: '/about',
            views: {'report@reports': {
                    templateUrl: 'views/search.about.html',
                    controller: 'ReportCtrl'
                }
            },
            data: {
                displayName: 'Available Reports',
                subCaption: '',
                classIcon: 'recommended-header-icon',
                breadcrumName: '{{reportName}}'
            },
            ncyBreadcrumb: {
                label: '{{reportName}}'
            }

        })
        .state('reports.details.report.access', {
            url: '/access',
            views: {'report@reports': {
                    templateUrl: 'views/search.access.html',
                    controller: 'ReportCtrl'
                }
            },
            data: {
                displayName: 'Available Reports',
                subCaption: '',
                classIcon: 'recommended-header-icon',
                breadcrumName: '{{reportName}}'
            },
            ncyBreadcrumb: {
                label: '{{reportName}}'
            }

        })
        .state('reports.details.report.feedback', {
            url: '/feedback',
            views: {'report@reports': {
                    templateUrl: 'views/search.feedback.html',
                    controller: 'ReportCtrl'
                }
            },
            data: {
                displayName: 'Available Reports',
                subCaption: '',
                classIcon: 'recommended-header-icon',
                breadcrumName: '{{reportName}}'
            },
            ncyBreadcrumb: {
                label: '{{reportName}}'
            }

        })
        .state('reports.groupdetails', {
            url: '/v/:groupId',
            views: {'report': {
                    templateUrl: 'views/reports.list.level.html',
                    controller: function ($scope, $stateParams) {
                        $scope.access.groupItems($stateParams.groupId);
                    }

                }
            },
            data: {
                displayName: 'Available Reports',
                subCaption: '',
                classIcon: 'recommended-header-icon'
            }
        })
        .state('help', {
            url: '/help',
            templateUrl: 'views/underconstruction.html',
            controller: '',
            data: {
                displayName: 'Under Construction',
                subCaption: '',
                classIcon: 'home-header-icon'
            }
        })
        .state('faq', {
            url: '/faq',
            templateUrl: 'views/underconstruction.html',
            controller: '',
            data: {
                displayName: 'Under Construction',
                subCaption: '',
                classIcon: 'home-header-icon'
            }
        })
        .state('tilesPage', {
            url: '/tilesPage',
            templateUrl: 'views/tilesPage.html',
            controller: 'tilesPageCtrl'
        })
        .state('page404', {
            url: '/404',
            templateUrl: 'views/404.html',
            controller: 'tilesPageCtrl'
        });

});
// .run(function ($rootScope, $location) {
//     // Redirect to login if route requires auth and you're not logged in
//     $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
//         console.log(toState.url);
//         $location.path(toState.url);
//         // if (toState.authenticate && !loggedIn) {
//         //       $rootScope.returnToState = toState.url;
//         //       $rootScope.returnToStateParams = toParams.Id;
//         //       $location.path('/login');
//         // }
//     });
// });
