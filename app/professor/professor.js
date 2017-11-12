'use strict';

angular.module('MathMemory.professor', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/professor', {
        templateUrl: 'professor/professor.html',
        controller: 'ProfessorCtrl'
    });
}])

.controller('ProfessorCtrl', ['$scope','$location','$cookieStore',function($scope,$location,$cookieStore) {
    $scope.user = {};
    
    $scope.Cadastrar = function(e) {
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword($scope.user.email, $scope.user.password).then(function() {

            firebase.database().ref('professor').push({
                nomeP: $scope.user.nome,
                emailP: $scope.user.email,
                cpfP: $scope.user.cpf,
                dataN: $scope.user.nascimento
            });
            
            firebase.database().ref('escola').push({
                nomeEscola: $scope.escola.nome,
                rua: $scope.escola.rua,
                bairro: $scope.escola.bairro,
                cidade: $scope.escola.cidade,
                estado: $scope.escola.estado,
                cep: $scope.escola.cep
            });
            
            firebase.auth().signInWithEmailAndPassword($scope.user.email, $scope.user.password).then(function() {
                firebase.auth().onAuthStateChanged(function(user) {
                    if (user) {
                        $cookieStore.put('user',user);
                    } else {
                    }
                });
                
                    $location.path("/acompanhamento");
                    $scope.$apply();
                }, function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    alert(errorMessage);
            });
        }), function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage);
        };

        
        
        
/*        firebase.database().ref('turma').push({
            nomeTurma: $scope.turma.nome,
            nomeEscola: $scope.escola.nome,
        });
        
        firebase.auth().createUserWithEmailAndPassword($scope.aluno.email, $scope.aluno.password).then(function() {
            firebase.database().ref('aluno').push({
                nomeAluno: $scope.aluno.nome,
                emailAluno: $scope.aluno.email,
                dataNAluno: $scope.aluno.nascimento
            });  */
        
           
            
            
       /* }, function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console(errorMessage);
        });*/

    }   
}]);

