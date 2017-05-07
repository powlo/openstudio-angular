'use strict';

angular.module('openstudioAngularApp')
    .controller('EventListCtrl', [
      '$rootScope', '$scope', '$stateParams', 'Event',
      function ($rootScope, $scope, $stateParams, Event) {
        $scope.hero = {title:  "Open Studio", image: "/images/pexels-photo-70183.jpeg"};
        var events_per_page = 9;

        $scope.page = 0;
        //ilike doesn't seem to work with mongodb...
        if ($stateParams.search === undefined) {
          $stateParams.search = '';
        }
        const ilike_pattern = "/.*" + $stateParams.search + ".*/i";
        Event.find({
          filter: {
            limit : events_per_page,
            where: {name: {regexp: ilike_pattern}}
          }},
          function (response) { /*success*/
            $scope.events = response;
            $scope.count = response.length;
          },
          function (response) { /*error*/
            console.log("Error: " + response + " " + response);
          });
    }]);
