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
    'lbServices',
    'uiGmapgoogle-maps',
    'angular.filter'
  ])
    .config(function ($stateProvider, $urlRouterProvider,
      LoopBackResourceProvider, uiGmapGoogleMapApiProvider) {
        LoopBackResourceProvider.setUrlBase('http://localhost:8080/api');

        uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyBK8FryBmEpUNMPy31IcoF9iErtDI7JG3Q',
        libraries: 'drawing'
        });

        $stateProvider
            .state('app', {
              url: '',
              templateUrl : 'views/base.html',
              controller  : 'BaseCtrl'
            })
            .state('app.map', {
              url: '/map/',
              templateUrl: 'views/map.html',
              controller: 'MapCtrl'
            })
            .state('app.events', {
              url: '/events/?search',
              templateUrl: 'views/event_list.html',
              controller: 'EventListCtrl'
            })
            .state('app.events.detail', {
              url: ':id',
              templateUrl: 'views/event_detail.html',
              controller: 'EventDetailCtrl'
            });
        $urlRouterProvider.otherwise('/events/');
    });
