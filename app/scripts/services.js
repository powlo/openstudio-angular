'use strict';

angular.module('openstudioAngularApp')
    .service('artistService', ['$resource', 'apiBaseURL', function ($resource, apiBaseURL) {

        this.getArtists = function () {
            return $resource(apiBaseURL + "artists/:id", null, {
                'update': {
                    method: 'PUT'
                }
            });
        };
    }]);
