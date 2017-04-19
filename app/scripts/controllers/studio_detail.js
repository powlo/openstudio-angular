'use strict';

angular.module('openstudioAngularApp')
    .controller('StudioDetailCtrl', ['$scope', '$stateParams', 'Studio', function ($scope, $stateParams, Studio) {
        $scope.studio = {};
        $scope.loading = true;
        Studio.findById(
          {id: $stateParams.id},
          function (response) {
              $scope.hero = { title: '', image: response.image };
              response.address = [response.thoroughfare, response.premise, response.postal_code].join(', ');
              $scope.studio = response;
              $scope.loading = false;
          },
          function (response) {
              console.log(response);
          });


        //I'm uneasy about this since we're making display
        //decisions in the controller

        let latLng = new google.maps.LatLng(52.2053,0.1218);

        let mapProp= {
          center: latLng,
          zoom:15,
        };

        let map = new google.maps.Map(document.getElementById("studioMap"),mapProp);

        let marker = new google.maps.Marker({
          position: latLng,
          map: map
        });
}]);
