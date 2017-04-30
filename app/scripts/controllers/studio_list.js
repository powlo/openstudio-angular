'use strict';

angular.module('openstudioAngularApp')
    .controller('StudioListCtrl', [
      '$rootScope', '$scope', '$stateParams', 'Studio',
      function ($rootScope, $scope, $stateParams, Studio) {
        $scope.hero = {title:  "Open Studio", image: "/images/pexels-photo-70183.jpeg"};
        var studios_per_page = 9;

        $scope.page = 0;
        //ilike doesn't seem to work with mongodb...
        if ($stateParams.search === undefined) {
          $stateParams.search = '';
        }
        const ilike_pattern = "/.*" + $stateParams.search + ".*/i";
        Studio.find({
          filter: {
            limit : studios_per_page,
            where: {name: {regexp: ilike_pattern}}
          }},
          function (response) { /*success*/
            $scope.studios = response;
            $scope.count = response.length;
          },
          function (response) { /*error*/
            console.log("Error: " + response + " " + response);
          });
    }]);
