'use strict';

angular.module('MathMemory.acompanhamento', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/acompanhamento', {
        templateUrl: 'acompanhamento/acompanhamento.html',
        controller: 'acompanhamentoCtrl'
    });
}])

.controller('acompanhamentoCtrl', ['$scope','$location','CommonProp', '$cookieStore',function($scope,$location,CommonProp,$cookieStore) {
    
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

    }else{
        $location.path("/login");
        $scope.$apply();
    }
}]);