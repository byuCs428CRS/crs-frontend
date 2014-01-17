'use strict';

/* Controllers */
var classregApp = angular.module('classregApp', ['classregApp.filters']);

classregApp.controller('ClassListCtrl', function($scope, $http) {
    $http.get('classes/classes.json').success(function(data) {
        $scope.classes = data;
    });
    $http.get('classes/departments.json').success(function(data) {
        $scope.depts = data;
    })

});

//filterOptions:
// - dept
// - searchQuery (search names & descriptions)
// - classLevel
//   - classLevel.100, classLevel.200, classLevel.300, classLevel.400, classLevel.500 : (each true/false)

angular.module('classregApp.filters', [])
    .filter('classFilter', [function () {
        return function (classes, filterOptions) {
            if (!angular.isUndefined(classes) && !angular.isUndefined(filterOptions)) {
                var tempClasses = [];

                classregApp.filter('filter')(classes, filterOptions);

                angular.forEach(classes, function (_class) {
                    tempClasses.push(_class);
                });
                return tempClasses;
            } else {
                return classes;
            }
        };
    }]);