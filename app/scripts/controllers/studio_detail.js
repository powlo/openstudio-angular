'use strict';

angular.module('openstudioAngularApp')
    .controller('StudioDetailCtrl', ['$scope', '$stateParams', 'Studio', function ($scope, $stateParams, Studio) {
        $scope.studio = {};
        $scope.loading = true;
        Studio.findById(
          {id: $stateParams.id},
          function (response) {
              $scope.hero = { title: '', image: response.image };
              response.address = [response.thoroughfare, response.premise, response.postal_code].filter(x => x !== '').join(', ');
              $scope.studio = response;
              $scope.loading = false;


              //I'm uneasy about this since we're making display
              //decisions in the controller
              let latLng = new google.maps.LatLng(52.2053,0.1218);

              let mapProp= {
                center: latLng,
                zoom:15,
              };

              let map = new google.maps.Map(document.getElementById("studioMap"),mapProp);

              var geocoder = new google.maps.Geocoder();
              console.log($scope.studio.address);
              geocoder.geocode( { address: $scope.studio.address, componentRestrictions: {
          country: 'UK'}}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                  map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                  map: map,
                  position: results[0].geometry.location
                });
                } else {
                  console.log("Geocode was not successful for the following reason: " + status);
                }
                });

          },
          function (response) {
              console.log(response);
          });



}]);
