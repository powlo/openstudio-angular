'use strict';

angular.module('openstudioAngularApp')
    .controller('ArtistListCtrl', ['$scope', 'artistService', function ($scope, artistService) {
        $scope.loading = true;
        console.log('hero');
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
