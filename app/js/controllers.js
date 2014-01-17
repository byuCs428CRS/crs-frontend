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
		return (!angular.isDefined(q) || q == "" || 
			(angular.lowercase(course.name).indexOf(q) >= 0 || 
			angular.lowercase(course.description).indexOf(q) >= 0)) ? true : false;
	};
	
	// Filters by course level
	$scope.courseLevelFilter = function(course) {
		var targetLevel = course.number[0] + '00';
		return ($scope.filterOptions.levels[targetLevel]) ? true : false;
	};
	
	// Sorts table by the selected column and updates ascending/descending order
	$scope.updateSort = function(selected) {
		$scope.desc = $scope.sortBy == selected && !$scope.desc; 
		$scope.sortBy = selected;
	};
	
	// Retrieves the styling class for a sortable table header
	$scope.sortedClass = function(selected) {
		return $scope.sortBy == selected ? ($scope.desc ? 'sorted-desc' : 'sorted-asc') : '';
	};
	
});
