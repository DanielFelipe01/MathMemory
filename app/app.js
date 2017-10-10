'use strict';

// Declare app level module which depends on views, and components
angular.module('MathMemory', [
  'ngRoute',
  'MathMemory.login',
  'MathMemory.register'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/login'});
}]);