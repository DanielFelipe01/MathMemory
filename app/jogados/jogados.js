'use strict';

angular.module('MathMemory.jogados', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/jogados', {
        templateUrl: 'jogados/jogados.html',
        controller: 'jogadosCtrl'
    });
}])

.controller('jogadosCtrl', ['$scope','$location','CommonProp', '$cookieStore',function($scope,$location,CommonProp,$cookieStore) {
    
    $scope.user = $cookieStore.get('user');
    $scope.jogos = [];
    
       if ($scope.user != null) {
            var ref = firebase.database().ref("jogo");
            ref.once('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var emailP = childSnapshot.val().usuario;
                        if (emailP == $scope.user.email){
                            $scope.jogos.push ({
                                "data" : childSnapshot.val().data,
                                "operacao": childSnapshot.val().modo,
                                "nivel": childSnapshot.val().nivel,
                                "pontuacao": childSnapshot.val().pontos,
                            });
                            $scope.$apply();
                        }
                    });
                });
           
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