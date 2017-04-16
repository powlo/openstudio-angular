'use strict';

angular.module('openstudioAngularApp')
    .controller('ArtistDetailCtrl', ['$scope', '$stateParams', 'Artist', function ($scope, $stateParams, Artist) {
        $scope.artist = {};
        $scope.loading = true;
        Artist.findById(
          {id: $stateParams.id},
          function (response) {
              $scope.hero = { title: '', image: response.image };
              $scope.artist = response;
              $scope.loading = false;
          },
          function (response) {
              console.log(response);
          });
}]);
