'use strict';

/* Controllers */
var classregApp = angular.module('classregApp', []);

classregApp.controller('ClassListCtrl', function($scope) {
	$scope.classes = [
		{
			'dept': 'CS',
			'number': '428',
			'name': 'Software Engineering',
			'description': 'An introduction to building and managing software in a team of engineers.' 
		},
		{
			'dept': 'CS',
			'number': '450',
			'name': 'Digital Signal Processing',
			'description': 'Processing signals, including images, audio, video, etc.' 
		},
		{
			'dept': 'Math',
			'number': '313',
			'name': 'Elementary Linear Algebra',
			'description': 'Basics of linear algebra, including matrices and other crap.' 
		},
		{
			'dept': 'Engl',
			'number': '316',
			'name': 'Technical Communication',
			'description': 'Writing and communication skills relating to technical fields.' 
		}
	];
});
