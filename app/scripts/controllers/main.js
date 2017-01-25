'use strict';

/**
 * @ngdoc function
 * @name openstudioAngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the openstudioAngularApp
 */

angular.module('openstudioAngularApp')
    .controller('MainCtrl', ['$scope', 'artistService', function ($scope, artistService) {
        $scope.loading = true;
        artistService.getArtists().query(
            function (response) {
                $scope.artists = response;
                $scope.loading = false;
            },
            function (response) {
                console.log('Oh dear');
                console.log("Error: " + response.status + " " + response.statusText);
            });
    }]);