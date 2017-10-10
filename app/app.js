'use strict';

// Declare app level module which depends on views, and components
angular.module('MathMemory', [
  'ngRoute',
  'MathMemory.login'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/login'});
}]);