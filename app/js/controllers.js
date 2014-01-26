'use strict';

/* Controllers */
var classregApp = angular.module('classregApp', []);

classregApp.controller('CourseListCtrl', function($scope, $http) {
	
	$http.get('courses/backend-response.json').success(function(data) {
        $scope.departments = data.departments
    });
	
    // var crossSiteRequest = createCORSRequest('GET', 'http://localhost:8000/app/courses/backend-response.json')
	// crossSiteRequest.send()
	// crossSiteRequest.onload = function() {
		// $scope.departments = jQuery.parseJSON(crossSiteRequest.responseText).departments
	// }
	// crossSiteRequest.onerror = function() {
		// console.log("there was an error")
	// }
    $scope.courseLevels = ['100', '200', '300', '400', '500', '600'];
    $scope.filterOptions = {
		levels: {}
	};
	$scope.sortBy = 'dept';
	$scope.filteredDept = ''
	$scope.selectedCourse = undefined
	
	angular.forEach($scope.courseLevels, function(level) {
		$scope.filterOptions.levels[level] = true;
	});
    
    // Searches both course name and course description fields
    $scope.searchQueryFilter = function(course) {
		var q = angular.lowercase($scope.filterOptions.searchQuery);
		return (!angular.isDefined(q) || q == "" || 
			(angular.lowercase(course.title).indexOf(q) >= 0 || 
			angular.lowercase(course.description).indexOf(q) >= 0));
	};
	
	//Filters by department
	$scope.departmentFilter = function(dept) {
		return $scope.filteredDept === /* all departments */ '' || $scope.filteredDept === dept.shortCode
	}
	
	// Filters by course level
	$scope.courseLevelFilter = function(course) {
		var targetLevel = course.courseId[0] + '00';
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
