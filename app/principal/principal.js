'use strict';

angular.module('MathMemory.principal', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/principal', {
        templateUrl: 'principal/principal.html',
        controller: 'PrincipalCtrl'
    });
}])

.controller('PrincipalCtrl', ['$scope','$location','CommonProp', '$cookieStore',function($scope,$location,CommonProp,$cookieStore) {
    $scope.user = $cookieStore.get('user');
    
    if ($scope.user != null) {
        $scope.jogar = function() {
            document.getElementById("telaJogar").style.display = "none";
            document.getElementById("telaModoJogo").style.display = "block";
        };

        $scope.modoJogo = function(modo) {
            CommonProp.setModo(modo);
            document.getElementById("telaModoJogo").style.display = "none";
            document.getElementById("telaNivelJogo").style.display = "block";
        };

        $scope.nivelJogo = function(nivel) {
            CommonProp.setNivel(nivel);
            $location.path("/jogo");
            $scope.$apply();
        };

        $scope.iniciarLayout = function(){
            document.getElementById("telaModoJogo").style.display = "none";
            document.getElementById("telaNivelJogo").style.display = "none";
        };
        
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
}]).service('CommonProp', function() {
    var user = "";
    var nivel = "";
    var modo = "";

    return {
        getNivel: function() {
            return nivel;
        },
        setNivel: function(value) {
            nivel = value;
        },
        setModo: function(value) {
            modo = value;
        },
        getModo: function() {
            return modo;
        }
    };
});

