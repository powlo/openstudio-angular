'use strict';

angular.module('openstudioAngularApp')
    .service('artistService', ['$resource', 'baseURL', function ($resource, baseURL) {

        this.getArtists = function () {
            return $resource(baseURL + "artists/:id", null, {
                'update': {
                    method: 'PUT'
                }
            });
        };
    }]);
