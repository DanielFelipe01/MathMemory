'use strict';

angular.module('MathMemory.turmas', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/turmas', {
        templateUrl: 'turmas/turmas.html',
        controller: 'TurmasCtrl'
    });
}])

.controller('TurmasCtrl', ['$scope','$location','CommonProp', '$cookieStore',function($scope,$location,CommonProp,$cookieStore) {
    
    $scope.user = $cookieStore.get('user');

    if ($scope.user != null) {
       $scope.Sair = function(){
            firebase.auth().signOut().then(function() {
              $cookieStore.remove('user');
                $location.path("/login");
                $scope.$apply();
            }).catch(function(error) {
              alert("Erro ao desconectar-se");
            });
            
        }

        $scope.iniciarLayout();
    }else{
        $location.path("/login");
        $scope.$apply();
    }
}]);