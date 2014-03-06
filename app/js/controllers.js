'use strict';

/* Controllers */
var classregControllers = angular.module('classregControllers', []);

classregControllers.controller('HeaderController', ['$scope', '$location',
	function($scope, $location) {
		$scope.isActive = function(viewLocation) { 
        return viewLocation === $location.path();
    };
}]);

classregControllers.controller('CourseListCtrl', ['$scope', '$http', '$cookies',
	function($scope, $http, $cookies) {

	    $http.get('courses/courses.json').success(function(data) {
	    	$scope.departments = data.departments;

			$scope.courses = [];
			angular.forEach($scope.departments, function(dept) {
				angular.forEach(dept.courses, function(course) {
					var newCourse = {};
					newCourse.title = course.title;
					newCourse.owningDepartment = course.owningDepartment;
					newCourse.courseId = course.courseId;
					newCourse.description = course.description;
					newCourse.credits = course.credits;
					newCourse.fulfillments = course.fulfillments;
					newCourse.prereqs = course.prereqs;
					newCourse.dept = {};
					newCourse.dept.title = dept.title;
					newCourse.dept.shortCode = dept.shortCode;
                    newCourse.titleCode = course.titleCode;
                    newCourse.byuId = course.byuId
					newCourse.sections = [];
					angular.forEach(course.sections, function(oldSection) {
						var newSection = {}
						newSection.sectionId = oldSection.sectionId;
						newSection.professor = oldSection.professor;
						newSection.room = oldSection.room;
						newSection.buildingAbbreviation = oldSection.buildingAbbreviation;
						newSection.classPeriods = [];
						newSection.classSize = oldSection.classSize;
						newSection.waitlistCount = oldSection.waitlistCount;
						newSection.registeredStudents = oldSection.registeredStudents;
                        newSection.sectionType = oldSection.sectionType
						angular.forEach(oldSection.times, function(time) {
							var timeOfDay = time.startTime + '-' + time.endTime;
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

		// $http.get('courses/courses.json').success(function(data) {
		// 	$scope.courses = data;
		// });
		// $http.get('courses/departments.json').success(function(data) {
		// 	$scope.departments = data;
		// });

	    // var crossSiteRequest = createCORSRequest('GET', 'http://localhost:8000/app/courses/backend-response.json')
		// crossSiteRequest.send()
		// crossSiteRequest.onload = function() {
			// $scope.departments = jQuery.parseJSON(crossSiteRequest.responseText).departments
		// }
		// crossSiteRequest.onerror = function() {
			// console.log("there was an error")
		// }

        $scope.initStuff = function() {
            $scope.loggedIn = false;
            // TODO: check the server for a session, set loggedIn to true and populate session data
            $scope.courseLevels = ['100', '200', '300', '400', '500', '600'];
            $scope.currentSemester = "Summer 2014" //Should do some kind of logic or API call here
            $scope.plannedCourses = [];
            $scope.signinAlerts = [];
            $scope.saved = false;
            $scope.filterOptions = {
                levels: {}
            };
            $scope.sortBy = 'dept.title';
            $scope.filteredDept = '';
            $scope.selectedCourse = undefined;
            $scope.signinTab = true;
            $scope.createTab = false;

            angular.forEach($scope.courseLevels, function(level) {
                $scope.filterOptions.levels[level] = true;
            });

            $scope.loginUsername = '';
            $scope.loginPassword = '';
            $scope.createUsername = '';
            $scope.createPassword = '';
            $scope.createPassword2 = '';
        };

        $scope.initStuff();

	    // Searches both course name and course description fields
	    $scope.searchQueryFilter = function(course) {
			var q = angular.lowercase($scope.filterOptions.searchQuery);
			return (!angular.isDefined(q) || q == "" || 
				(angular.lowercase(course.title).indexOf(q) >= 0 || 
				angular.lowercase(course.description).indexOf(q) >= 0 ||
				angular.lowercase(course.dept.shortCode).indexOf(q) >= 0 ||
				angular.lowercase(course.dept.title).indexOf(q) >= 0 ||
				angular.lowercase(course.courseId).indexOf(q) >= 0 ||
				angular.lowercase(course.dept.shortCode + course.courseId).indexOf(q.replace(/\s/g,'')) >= 0 ||
				angular.lowercase(course.dept.title.replace(/\s/g,'') + course.courseId).indexOf(q.replace(/\s/g,'')) >= 0));
		};
		
		//Filters by department
		$scope.departmentFilter = function(course) {
			return $scope.filteredDept === /* all departments */ '' || $scope.filteredDept === course.dept.shortCode
		};
		
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
					return 'M';
				case 'TUESDAY':
					return 'Tu';
				case 'WEDNESDAY':
					return 'W';
				case 'THURSDAY':
					return 'Th';
				case 'FRIDAY':
					return 'F';
				case 'SATURDAY':
					return 'Sa';
				case 'SUNDAY':
					return 'Su'
			}
		};
		
		$scope.classPeriodsToString = function(classPeriods) {
			var prefix = '';
			var result = '';
			for(var key in classPeriods) {
				result += prefix + classPeriods[key] + ' ' + key;
				prefix = "\n"; //\n probably doesn't work, but angular doesn't allow </br>
			}
			return result
		};

		// check if a course is planned, where cid is a course/section id that looks like this: "CS256-1" for section 1
		$scope.isPlanned = function(cid) {
			for (var i = 0; i < $scope.plannedCourses.length; i++) {
				if ($scope.plannedCourses[i].cid == cid) {
					return true;
				}
			}
			return false;
		};

		// gets the planned section of a course. if no planned section, returns null.
		$scope.getPlannedCourse = function(dept, num) {
			for (var i = 0; i < $scope.plannedCourses.length; i++) {
				if ($scope.plannedCourses[i].dept.shortCode == dept && $scope.plannedCourses[i].courseId == num) {
					return $scope.plannedCourses[i];
				}
			}
			return null;
		};
		
		$scope.addCourseToPlan = function(course, section) {
			$scope.saved = false;
			var fullCourseName = course.dept.shortCode + course.courseId;
			var cid = fullCourseName + "-" + section.sectionId;

			var plannedCourse = $scope.getPlannedCourse(course.dept.shortCode, course.courseId);

			if (plannedCourse) {
				// if there's already another section of the same course, just replace it
				$scope.removeCourseFromPlan(plannedCourse);
			}

			if (!$scope.isPlanned(cid)) {
				var plannedCourse = new Object();
				plannedCourse.cid = cid;
				plannedCourse.dept = course.dept;
				plannedCourse.courseId = course.courseId;
				plannedCourse.sectionId = section.sectionId;
				plannedCourse.instructor = section.professor;
				plannedCourse.classPeriods = section.classPeriods;
                plannedCourse.byuId = course.byuId
                plannedCourse.titleCode = course.titleCode
                plannedCourse.credits = course.credits
                plannedCourse.sectionType = section.sectionType
				$scope.plannedCourses.push(plannedCourse);
			}

			var elId = '#plannedCourse-' + ($scope.plannedCourses.length - 1).toString();
			
			setTimeout(function() {
				$(elId).effect("highlight", {}, 1000);
			}, 100);
		};

		$scope.removeCourseFromPlan = function(course) {
			$scope.saved = false;
			var i = $scope.plannedCourses.indexOf(course);
			if (i > -1)
				$scope.plannedCourses.splice(i, 1);
		};

		$scope.savePlan = function() {
            if (!$scope.loggedIn) {
                $('#loginModal').modal('show');
            } else {
                //TODO: save the plan to the database under the current session
			    $scope._savePlan();
            }
		};

        $scope._savePlan = function() {
            $scope.saved = true;
        };

		$scope.addAlert = function(message) {
	    	$scope.signinAlerts.push({msg: message});
	  	};

	  	$scope.closeAlert = function(index) {
	    	$scope.signinAlerts.splice(index, 1);
	  	};

        $scope.signInUser = function() {
            $scope.signinAlerts.length = 0;
            if (!($scope.loginUsername && $scope.loginUsername.length && $scope.loginPassword && $scope.loginPassword.length)) {
                $scope.addAlert("All fields are required.");
            } else {
                $scope.loggedIn = true;
                $scope.username = $scope.loginUsername;
                $('#loginModal').modal('hide');
                $scope._savePlan();
            }
        };

        $scope.signOutUser = function() {
            $scope.initStuff();
            $scope.loggedIn = false;
        };

        $scope.createUserAccount = function() {
            console.log("creating user account");
            $scope.signinAlerts.length = 0;
            if (!($scope.createUsername && $scope.createUsername.length && $scope.createPassword && $scope.createPassword.length && $scope.createPassword2 && $scope.createPassword2.length)) {
                $scope.addAlert("All fields are required.");
            } else if (!/^[a-z0-9_\-@]+$/i.test($scope.createUsername)) {
                $scope.addAlert("Username cannot contain special characters other than -, _, and @.");
            } else if ($scope.createPassword != $scope.createPassword2) {
                $scope.addAlert("Passwords do not match.");
            } else {
                $scope.registerUser($scope.createUsername, $scope.createPassword);
            }
        };

        $scope.registerUser = function(username, password) {

            $http.get('http://andyetitcompiles.com/auth/login').success(function(data) {
                data['username'] = username;
                var hashedPw = doHash(password, data['pepper']);
                data['pass'] = hashedPw;
                $http.post('http://andyetitcompiles.com/auth/login', data)
                    .success(function(data) {
                        console.log(data);
                    }).error(function(data) {
                        // username already exists?
                    });
            });
            // successful
            $scope.loggedIn = true;
            $scope.username = username;
            $('#loginModal').modal('hide');
        };

        $scope.registerClasses = function() {
            $cookies.c = "regOfferings"
            var classes = []
            console.log($scope.plannedCourses)
            for( var i=0; i<$scope.plannedCourses.length; i++ ) {
                var klass = {}
                klass.e = '@AddClass'
                klass.courseId = $scope.plannedCourses[i].byuId
                klass.titleCode = $scope.plannedCourses[i].titleCode
                klass.credits = $scope.plannedCourses[i].credits
                klass.sectionType = $scope.plannedCourses[i].sectionType
                klass.sectionId = $scope.plannedCourses[i].sectionId
                classes.push(klass)
            }
            $cookies.classes = JSON.stringify(classes)

            var domain = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
            var query = '?service='+encodeURIComponent(domain+'/register.html')
            var url = 'https://cas.byu.edu/cas/login'
            $("#registration-iframe").attr("src", url + query)
            $("#registration-iframe").css("display", "inline")
            $scope.plannedCourses = []
        };
    }]);
