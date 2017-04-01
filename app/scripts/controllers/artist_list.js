'use strict';

angular.module('openstudioAngularApp')
    .controller('ArtistListCtrl', ['$scope', 'Artist', function ($scope, Artist) {
        let artist_per_page = 9;
        let count = Artist.count;
        console.log(count());
        $scope.page = 0;

        Artist.find({filter:{limit:artist_per_page}},
            function (response) { /*success*/
                $scope.artists = response;
            },
            function (response) { /*error*/
              console.log("Error: " + response.status + " " + response.statusText);
            });
    }]);
