'use strict';

/**
 * @ngdoc overview
 * @name openstudioAngularApp
 * @description
 * # openstudioAngularApp
 *
 * Main module of the application.
 */
angular
    .module('openstudioAngularApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngTouch'
  ])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('artists', {
                url: '/artists',
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .state('detail', {
                url: '/artists/:id',
                templateUrl: 'views/detail.html',
                controller: 'DetailCtrl'
            });
        $urlRouterProvider.otherwise('/artists');
    });