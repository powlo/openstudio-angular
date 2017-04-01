'use strict';

angular.module('openstudioAngularApp')
    .controller('ArtistDetailCtrl', ['$scope', '$stateParams', 'Artist', function ($scope, $stateParams, Artist) {
        $scope.artist = {};
        $scope.loading = true;
        Artist.findById(
          {id: $stateParams.id},
          function (response) {
              $scope.artist = response;
              $scope.loading = false;
          },
          function (response) {
              console.log(response);
          });
}]);
