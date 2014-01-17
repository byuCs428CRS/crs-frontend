'use strict';

/* jasmine specs for controllers go here */

describe('ClassReg controllers', function() {
    beforeEach(module('classregApp'));

    describe('ClassListCtrl', function(){

        // Example test for class list controller
        it('should create classes model with 4 classes', inject(function($controller) {
            var scope = {}, ctrl = $controller('ClassListCtrl', {$scope: scope});
            expect(scope.classes.length).toBe(4);
        }));

    });

});
