'use strict';

angular.module('openstudioAngularApp')
    .constant("baseURL", "http://localhost:8080/api/")
    .service('artistService', ['$resource', 'baseURL', function ($resource, baseURL) {

        this.getArtists = function () {
            return $resource(baseURL + "artists/:id", null, {
                'update': {
                    method: 'PUT'
                }
            });
        };
    }]);