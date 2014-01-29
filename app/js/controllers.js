'use strict';

/* Controllers */
var classregApp = angular.module('classregApp', []);

classregApp.controller('CourseListCtrl', function($scope, $http) {
	
    $http.get('courses/backend-response.json').success(function(data) {
        $scope.departments = data.departments;
		$scope.courses = []
		angular.forEach($scope.departments, function(dept) {
			angular.forEach(dept.courses, function(course) {
				var newCourse = {}
				newCourse.title = course.title
				newCourse.owningDepartment = course.owningDepartment
				newCourse.courseId = course.courseId
				newCourse.description = course.description
				newCourse.credits = course.credits
				newCourse.fulfillments = course.fulfillments
				newCourse.prereqs = course.prereqs
				newCourse.dept = {}
				newCourse.dept.title = dept.title
				newCourse.dept.shortCode = dept.shortCode
				newCourse.sections = []
				angular.forEach(course.sections, function(oldSection) {
					var newSection = {}
					newSection.sectionId = oldSection.sectionId
					newSection.professor = oldSection.professor
					newSection.classPeriods = []
					angular.forEach(oldSection.times, function(time) {
						var timeOfDay = time.startTime + '-' + time.endTime
						if( timeOfDay in newSection.classPeriods )
							newSection.classPeriods[timeOfDay] += ", " + $scope.abbreviateDay(time.day)
						else
							newSection.classPeriods[timeOfDay] = $scope.abbreviateDay(time.day)
					});
					newCourse.sections.push(newSection)
				});
				// console.log(newCourse)
				$scope.courses.push(newCourse)
			});
		});
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
	$scope.departmentFilter = function(course) {
		return $scope.filteredDept === /* all departments */ '' || $scope.filteredDept === course.dept.shortCode
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
	
	$scope.abbreviateDay = function(day) {
		switch( day ) {
			case 'MONDAY':
				return 'M'
			case 'TUESDAY':
				return 'Tu'
			case 'WEDNESDAY':
				return 'W'
			case 'THURSDAY':
				return 'Th'
			case 'FRIDAY':
				return 'F'
			case 'SATURDAY':
				return 'Sa'
			case 'SUNDAY':
				return 'Su'
		}
	}
	
	$scope.classPeriodsToString = function(classPeriods) {
		var prefix = ''
		var result = ''
		for( var key in classPeriods ) {
			result += prefix + classPeriods[key] + ' ' + key
			prefix = "\n" //\n probably doesn't work, but angular doesn't allow </br>
		}
		return result
	};
	
});
