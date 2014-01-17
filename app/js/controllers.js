'use strict';

/* Controllers */
var classregApp = angular.module('classregApp', []);

classregApp.controller('CourseListCtrl', function($scope, $http) {
	
    $http.get('courses/courses.json').success(function(data) {
        $scope.courses = data;
    });
    $http.get('courses/departments.json').success(function(data) {
        $scope.depts = data;
    });
    $scope.courseLevels = ['100', '200', '300', '400', '500', '600'];
    $scope.filterOptions = {
		levels: {}
	};
	
	angular.forEach($scope.courseLevels, function(level) {
		$scope.filterOptions.levels[level] = true;
	});
    
    // Searches both course name and course description fields
    $scope.searchQueryFilter = function(course) {
		var q = angular.lowercase($scope.filterOptions.searchQuery);
		if (!angular.isDefined(q) || q == "" || 
		(angular.lowercase(course.name).indexOf(q) >= 0 || angular.lowercase(course.description).indexOf(q) >= 0)) {
			return true;
		} else {
			return false;
		}
	};
	
	// Filters by course level
	$scope.courseLevelFilter = function(course) {
		var targetLevel = course.number[0] + '00';
		if ($scope.filterOptions.levels[targetLevel])
			return true;
		else
			return false;
	};
});
