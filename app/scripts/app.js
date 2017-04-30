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
    'ngTouch',
    'ngResource',
    'ngMessages',
    'ngDialog',
    'lbServices'
  ])
    .config(function ($stateProvider, $urlRouterProvider, LoopBackResourceProvider) {
        LoopBackResourceProvider.setUrlBase('http://localhost:8080/api');
        $stateProvider
            .state('app', {
              url: '',
              views: {
                'header': {
                    templateUrl : 'views/header.html',
                    controller  : 'HeaderCtrl'
                }
              }
            })
            .state('app.studios', {
                url: '/studios/?search',
                views: {
                  'content@': {
                    templateUrl: 'views/studio_list.html',
                    controller: 'StudioListCtrl'
                  }
                }
            })
            .state('app.studios.detail', {
                url: ':id',
                views: {
                  'content@': {
                    templateUrl: 'views/studio_detail.html',
                    controller: 'StudioDetailCtrl'
                  }
                }
            });
        $urlRouterProvider.otherwise('/studios/');
    });
