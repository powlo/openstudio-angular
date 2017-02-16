'use strict';

angular.module('openstudioAngularApp')
.controller('LoginController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', function ($scope, ngDialog, $localStorage, AuthFactory) {

    $scope.loginData = $localStorage.getObject('userinfo','{}');

    $scope.login = function() {
        if($scope.rememberMe) {
           $localStorage.storeObject('userinfo',$scope.loginData);
         }

        AuthFactory.login($scope.loginData);

        ngDialog.close();

    };

    $scope.register = function () {
        console.log('you clicked to register!');
        //ngDialog.close();
        ngDialog.open({
          template: 'views/register.html',
          scope: $scope,
          className: 'ngdialog-theme-default',
          appendClassName: 'ngdialog-register',
          controller:"RegisterController" });
    };
}]);
