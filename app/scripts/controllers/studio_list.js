'use strict';

angular.module('openstudioAngularApp')
    .controller('StudioListCtrl', ['$rootScope', '$scope', 'Studio', function ($rootScope, $scope, Studio) {
        $scope.hero = {title:  "Open Studio", image: "/images/pexels-photo-70183.jpeg"};

        var studios_per_page = 9;
        Studio.count( function(value) {
          $scope.count = value.count;
        }, function() {
          console.log("Couldn't get studio count.");
        });

        $scope.page = 0;

        Studio.find({filter:{limit:studios_per_page}},
            function (response) { /*success*/
                $scope.studios = response;
            },
            function (response) { /*error*/
              console.log("Error: " + response.status + " " + response.statusText);
            });
    }]);
