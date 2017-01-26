'use strict';

angular.module('openstudioAngularApp')
    .controller('ArtistDetailCtrl', ['$scope', '$stateParams', 'artistService', function ($scope, $stateParams, artistService) {
        $scope.artist = {};
        $scope.loading = true;
        artistService.getArtists().get({
                id: $stateParams.id
            })
            .$promise.then(
                function (response) {
                    $scope.artist = response;
                    $scope.loading = false;
                },
                function (response) {
                    console.log(response);
                }
            );
}]);
