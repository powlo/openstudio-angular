'use strict';

angular.module('openstudioAngularApp')
.controller('RegisterController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', function ($scope, ngDialog, $localStorage, AuthFactory) {

    $scope.register={};
    $scope.loginData={};

    $scope.doRegister = function() {
        AuthFactory.register($scope.registerData);
        ngDialog.close();

    };
}]);
