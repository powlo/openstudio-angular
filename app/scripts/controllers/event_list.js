'use strict';

angular.module('openstudioAngularApp')
    .controller('EventListCtrl', [
      '$rootScope', '$scope', '$stateParams', 'Event',
      function ($rootScope, $scope, $stateParams, Event) {

        //util function, move to own module
        function group_by_date(acc, val){
          let index = acc.findIndex(function(element){
            return element.date === val.date;
          });
          if (index === -1){
            acc.push({'date' : val.date, 'events' : [val]});
          }
          else {
            acc[index].events.push(val);
          }
          return acc;
          //return a list of objects. Each object has a date and an events list
          /*
          [{'date': "Today", events: ['lots of events']}, {'date':'Tomorrow', events: ['more events']}]
          if (acc.hasOwnProperty(val.date)){
            acc[val.date].push(val);
          }
          else {
            acc[val.date] = [val];
          }
          return acc;
          */
        }

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
            //build list of events grouped by date
            $scope.events = events.reduce(group_by_date, []);

            //build our list of markers
            events.forEach(function(event){
              let m = {geopoint: {}, icon: 'images/map-marker.png', id: event.id};
              m.geopoint.latitude = event.geopoint.lat;
              m.geopoint.longitude = event.geopoint.lng;
              $scope.markers.push(m);
            });
          },
          function (response) { /*error*/
            console.log("Error: " + response + " " + response);
          });
    }]);
