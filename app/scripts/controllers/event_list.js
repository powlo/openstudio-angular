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
        tomorrow.setDate(today.getDate()+1);

        $scope.today = today.toString();
        $scope.tomorrow = tomorrow.toString();

        //event filtering criteria
        $scope.filter = {date: null};

        //every time we make a change, update the filtered events
        $scope.filter_change = function(){
          //figure out how to make this fire properly
          $scope.filtered_events = $filter('filter')($scope.events, $scope.filter, sameDay)
        }



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
          function (events) { /*success*/
            //create a marker for each event
            events.forEach(function(event){
              let m = {geopoint: {}, icon: 'images/map-marker.png', id: event.id};
              m.geopoint.latitude = event.geopoint.lat;
              m.geopoint.longitude = event.geopoint.lng;
              event.marker = m;
            });
            $scope.events = events;
          },
          function (response) { /*error*/
            console.log("Error: " + response + " " + response);
          });
    }]);
