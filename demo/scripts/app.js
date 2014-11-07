'use strict';

/**
 * @ngdoc overview
 * @name angularRouteBreadcrumbsApp
 * @description
 * # angularRouteBreadcrumbsApp
 *
 * Main module of the application.
 */
angular
  .module('angularRouteBreadcrumbsApp', [
    'ngAnimate',
    'ngRoute',
    'ngSanitize'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
