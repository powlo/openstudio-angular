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
            .state('app.artists', {
                url: '/artists/',
                views: {
                  'content@': {
                    templateUrl: 'views/artist_list.html',
                    controller: 'ArtistListCtrl'
                  }
                }
            })
            .state('app.artists.detail', {
                url: ':id',
                views: {
                  'content@': {
                    templateUrl: 'views/artist_detail.html',
                    controller: 'ArtistDetailCtrl'
                  }
                }
            });
        $urlRouterProvider.otherwise('/artists/');
    });
