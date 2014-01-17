'use strict';

/* Controllers */
var classregApp = angular.module('classregApp', []);

classregApp.controller('ClassListCtrl', function($scope, $http) {
    $http.get('classes/classes.json').success(function(data) {
        $scope.classes = data;
    });
    $http.get('classes/departments.json').success(function(data) {
        $scope.depts = data;
    })

});
