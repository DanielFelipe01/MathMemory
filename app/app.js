'use strict';

// Declare app level module which depends on views, and components
angular.module('MathMemory', [
    'ngRoute',
    'MathMemory.login',
    'MathMemory.principal',
    'MathMemory.jogo',
    'MathMemory.professor',
    'ngCookies',
    'MathMemory.acompanhamento',
    'MathMemory.turmas',
    'MathMemory.jogados'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/login'});
}]);