'use strict';

angular.module('openstudioAngularApp')
    .controller('DetailCtrl', ['$scope', '$stateParams', 'artistService', function ($scope, $stateParams, artistService) {
        console.log('ok gotcha');
        $scope.artist = {};
        $scope.cabbage = {};
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
                    console.log('ook');
                }
            );
}]);