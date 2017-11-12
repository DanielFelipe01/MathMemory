'use strict';

angular.module('MathMemory.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'login/login.html',
        controller: 'LoginCtrl'
    });
}])

.controller('LoginCtrl', ['$scope','$location', '$cookieStore',function($scope,$location,$cookieStore) {
    $scope.user = {};
    $scope.aluno = true;

    $scope.SignIn = function(e) {
        e.preventDefault();
        var email = $scope.user.email;
        var password = $scope.user.password;

        if (email != null && password != null){
            firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
                firebase.auth().onAuthStateChanged(function(user) {
                if (user) { 
                    var ref = firebase.database().ref("professor");
                    ref.once('value', function(snapshot) {
                        snapshot.forEach(function(childSnapshot) {
                            var emailP = childSnapshot.val().emailP;
                            if (emailP == email){
                                $scope.professor = childSnapshot.val();
                                
                                user= {
                                    "uid" : user.uid,
                                    "email": user.email,
                                    "nome": $scope.professor.nomeP,
                                    "cpf": $scope.professor.cpfP,
                                    "data": $scope.professor.dataN,
                                    "aluno": false
                                };
                                $cookieStore.put('user',user);
                                $location.path("/acompanhamento");
                                $scope.$apply();
                                
                            }
                        });
                    });
                    
                    var ref = firebase.database().ref("aluno");
                    ref.once('value', function(snapshot) {
                        snapshot.forEach(function(childSnapshot) {
                            var emailP = childSnapshot.val().emailAluno;
                            if (emailP == email){
                                $scope.aluno = childSnapshot.val();
                                user= {
                                    "uid" : user.uid,
                                    "email": user.email,
                                    "nome": $scope.aluno.nomeAluno,
                                    "data": $scope.aluno.dataNAluno,
                                    "aluno": true
                                };
                                $cookieStore.put('user',user);
                                $location.path("/principal");
                                $scope.$apply();
                            }
                        });
                    });
                } else {
                }
            });
            }, function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage);
            });
            
        }else{
            alert("Preencha ambos os campos!");
        }
    } 
    
    $scope.Cadastrar = function(e) {
        $location.path("/professor");
        $scope.$apply();    
    }

    $scope.formRegister = function() {
        document.getElementById("login-form").style.display = "none";
         document.getElementById("register-form").style.display = "block";
        angular.element(document.querySelector("#login-form-link")).removeClass("active");
        angular.element(document.querySelector("#register-form-link")).addClass("active");
    };

    $scope.formLogin = function() {
        document.getElementById("register-form").style.display = "none";
        document.getElementById("login-form").style.display = "block";
        angular.element(document.querySelector("#register-form-link")).removeClass("active");
        angular.element(document.querySelector("#login-form-link")).addClass("active");
    };
    
    $scope.formLogin();

}]);



