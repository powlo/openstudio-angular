'use strict';

angular.module('openstudioAngularApp')
    .controller('ArtistListCtrl', ['$rootScope', '$scope', 'Artist', function ($rootScope, $scope, Artist) {
        $scope.hero = {title:  "Open Studio", image: "/images/pexels-photo-70183.jpeg"};

        var artist_per_page = 9;
        Artist.count( function(value) {
          $scope.count = value.count;
        }, function() {
          console.log("Couldn't get artist count.");
        });

        $scope.page = 0;

        Artist.find({filter:{limit:artist_per_page}},
            function (response) { /*success*/
                $scope.artists = response;
            },
            function (response) { /*error*/
              console.log("Error: " + response.status + " " + response.statusText);
            });
    }]);
