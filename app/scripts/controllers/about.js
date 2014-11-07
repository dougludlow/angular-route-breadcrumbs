'use strict';

/**
 * @ngdoc function
 * @name angularRouteBreadcrumbsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularRouteBreadcrumbsApp
 */
angular.module('angularRouteBreadcrumbsApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
