'use strict';

/* Controllers */
var classregApp = angular.module('classregApp', []);


$http.get('phones/phones.json').success(function(data) {
    $scope.phones = data;
  });

  $scope.orderProp = 'age';


classregApp.controller('ClassListCtrl', function($scope) {
    $http.get('classes/classes.json').success(function(data) {
        $scope.classes = data;
    });
    $http.get('classes/departments.json').success(function(data) {
        $scope.depts = data;
    })

});
