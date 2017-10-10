'use strict';

angular.module('MathMemory.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', ['$scope','$location','CommonProp',function($scope,$location,CommonProp) {
  $scope.user = {};
  $scope.SignIn = function(e) {
      e.preventDefault();
      var email = $scope.user.email;
      var password = $scope.user.password;
      firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
          // do things if success
            console.log('User creation success');
            $location.path('/principal');
      }, function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console("error", errorMessage);
          // ...
      });
      firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            alert(user.uid);
          } else {
              alert("Erro");
          }
      });
  }
}])
.service('CommonProp', function() {
    var user = '';
 
    return {
        getUser: function() {
            return user;
        },
        setUser: function(value) {
            user = value;
        }
    };
});
