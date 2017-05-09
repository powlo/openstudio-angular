'use strict';

angular.module('openstudioAngularApp')
    .controller('EventListCtrl', [
      '$rootScope', '$scope', '$stateParams', 'Event',
      function ($rootScope, $scope, $stateParams, Event) {

        $scope.map = {
          center: {
            latitude: 52.2053,
            longitude: 0.1218 },
          zoom: 15
        };

        $scope.hero = {title:  "Open Studio", image: "/images/pexels-photo-70183.jpeg"};

        $scope.page = 0;
        //ilike doesn't seem to work with mongodb...
        if ($stateParams.search === undefined) {
          $stateParams.search = '';
        }
        const ilike_pattern = "/.*" + $stateParams.search + ".*/i";
        Event.find({
          filter: {
            where: {name: {regexp: ilike_pattern}}
          }},
          function (response) { /*success*/
            $scope.events = response;
            $scope.count = response.length;

            //directive 'ui-gmap-markers' needs the fields
            //latitude/longitude on the object.
            $scope.events.forEach(function(event){
              event.geopoint.latitude = event.geopoint.lat;
              event.geopoint.longitude = event.geopoint.lng;
            });
          },
          function (response) { /*error*/
            console.log("Error: " + response + " " + response);
          });
    }]);
