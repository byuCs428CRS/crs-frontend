'use strict';

/* Controllers */
var classregApp = angular.module('classregApp', []);

classregApp.controller('ClassListCtrl', function($scope) {
    $scope.depts = ['CS', 'Engl', 'Math', 'Rel A', 'Writing'];
	$scope.classes = [
		{
			'dept': 'CS',
			'number': '428',
			'name': 'Software Engineering',
			'description': 'An introduction to building and managing software in a team of engineers.',
            'hours': '3.0'
		},
		{
			'dept': 'CS',
			'number': '450',
			'name': 'Digital Signal Processing',
			'description': 'Processing signals, including images, audio, video, etc.',
            'hours': '3.0'
		},
		{
			'dept': 'Math',
			'number': '313',
			'name': 'Elementary Linear Algebra',
			'description': 'Basics of linear algebra, including matrices and other crap.',
            'hours': '3.0'
		},
		{
			'dept': 'Engl',
			'number': '316',
			'name': 'Technical Communication',
			'description': 'Writing and communication skills relating to technical fields.',
            'hours': '3.0'
		},
        {
			'dept': 'CS',
			'number': '124',
			'name': 'Computer Systems',
			'description': 'Introduction to computing from a hardware and software perspective.',
            'hours': '3.0'
		},
		{
			'dept': 'CS',
			'number': '142',
			'name': 'Intro to Computer Programming',
			'description': 'Basics of computer programming in C++.',
            'hours': '3.0'
		},
		{
			'dept': 'Math',
			'number': '112',
			'name': 'Calculus 1',
			'description': 'Calculus basics, including differentiation and its applications.',
            'hours': '3.0'
		},
		{
			'dept': 'Writing',
			'number': '150',
			'name': 'Writing & Rhetoric',
			'description': 'Writing and communication skills focusing on rhetorical and persuasive methods.',
            'hours': '3.0'
		},
        {
			'dept': 'CS',
			'number': '240',
			'name': 'Advanced Programming Concepts',
			'description': 'Advanced topics in computer programming.',
            'hours': '4.0'
		},
		{
			'dept': 'CS',
			'number': '330',
			'name': 'Concepts of Programming Lang',
			'description': 'Study of programming languages and their features and differences.',
            'hours': '3.0'
		},
		{
			'dept': 'Math',
			'number': '113',
			'name': 'Calculus 2',
			'description': 'More advanced calculus concepts, including integrals and their applications.',
            'hours': '3.0'
		},
		{
			'dept': 'Rel A',
			'number': '357',
			'name': 'The Pearl of Great Price',
			'description': 'Studies in the books of Moses, Abraham, Joseph Smith - History, and Joseph Smith - Matthew.',
            'hours': '2.0'
		}
	];
});
