'use strict';

angular.module('openstudioAngularApp')
    .controller('EventListCtrl', [
      '$rootScope', '$scope', '$stateParams', 'Event',
      function ($rootScope, $scope, $stateParams, Event) {

        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate()+1);

        $scope.today = today.toString();
        $scope.tomorrow = tomorrow.toString();
        //event filtering criteria
        $scope.filter = {date: null};

        //util function, move to own module
        $scope.sameDay = function(date){
          return function(event){
            if (!date) {return true;}
            const d1 = new Date(date);
            const d2 = new Date(event.date);
            return d2.getYear() === d1.getYear() &&
              d2.getMonth() === d1.getMonth() &&
              d2.getDate() === d1.getDate();
          };
        };

        $scope.map = {
          center: {
            latitude: 52.2053,
            longitude: 0.1218 },
          zoom: 15
        };
        $scope.markers = [];

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
            $scope.events = events;
            //create a marker for each event
            events.forEach(function(event){
              let m = {geopoint: {}, icon: 'images/map-marker.png', id: event.id};
              m.geopoint.latitude = event.geopoint.lat;
              m.geopoint.longitude = event.geopoint.lng;
              event.marker = m;
            });
          },
          function (response) { /*error*/
            console.log("Error: " + response + " " + response);
          });
    }]);
