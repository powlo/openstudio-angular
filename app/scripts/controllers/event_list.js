'use strict';

angular.module('openstudioAngularApp')
    .controller('EventListCtrl', [
      '$rootScope', '$scope', '$stateParams', '$filter', 'Event',
      function ($rootScope, $scope, $stateParams, $filter, Event) {

        //util function, move to own module
        function sameDay(actual, expected){
          if(!actual || !expected) {
            return true;
          }
          else {
            let a = new Date(actual);
            let b = new Date(expected);
            return a.toDateString() === b.toDateString();
          }
        }

        const today = new Date();
        const tomorrow = new Date(today);
        let events = [];

        tomorrow.setDate(today.getDate()+1);

        $scope.today = today.toString();
        $scope.tomorrow = tomorrow.toString();

        //event filtering criteria
        $scope.filter = {date: today.toString()};

        //every time we make a change to the filter, update the filtered events
        $scope.$watch('filter', function() {
          $scope.events = $filter('filter')(events, $scope.filter, sameDay)
        }, true);

        $scope.map = {
          center: {
            latitude: 52.2053,
            longitude: 0.1218 },
          zoom: 15
        };

        //ilike doesn't seem to work with mongodb...
        if ($stateParams.search === undefined) {
          $stateParams.search = '';
        }
        const ilike_pattern = "/.*" + $stateParams.search + ".*/i";
        Event.find({
          filter: {
            where: {name: {regexp: ilike_pattern}}
          }},
          function (objs) { /*success*/
            //create a marker for each event
            objs.forEach(function(event){
              let icon = {
                url: 'images/map-marker-point.svg',
                size: new google.maps.Size(50, 50),
                scaledSize: new google.maps.Size(50, 50)
              };
              let m = {geopoint: {}, icon: icon, id: event.id};
              m.geopoint.latitude = event.geopoint.lat;
              m.geopoint.longitude = event.geopoint.lng;
              event.marker = m;
            });

            //we want to keep all the events, but not have them in $scope.
            events = objs;

            //the scoped events are always passed through the filter first.
            $scope.events = $filter('filter')(events, $scope.filter, sameDay);
          },
          function (response) { /*error*/
            console.log("Error: " + response + " " + response);
          });
    }]);
