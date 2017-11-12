'use strict';

angular.module('MathMemory.jogo', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/jogo', {
        templateUrl: 'jogo/jogo.html',
        controller: 'JogoCtrl'
    });
}])

.controller('JogoCtrl', ['$scope','$location','CommonProp', '$cookieStore',function($scope,$location,CommonProp, $cookieStore) {
    $scope.user = $cookieStore.get('user');

    $scope.idImages = new Array(8);
    $scope.imageShow = new Array(8);
    $scope.image = new Array(8);
    $scope.pontos = 0;
    
    $scope.contaShow = false;
    $scope.valor1=0;
    $scope.valor2=0;
    
    $scope.idImage1 = null;
    $scope.idImage2 = null;
    $scope.idImageClick = null;
    
    $scope.results = new Array(4);
    
    $scope.modo = CommonProp.getModo();
    $scope.nivel = CommonProp.getNivel();

    if ($scope.modo != "" || $scope.nivel != ""){
        $scope.EsconderImagens = function(){
            for(var i = 0; i < $scope.imageShow.length;i++){
               $scope.imageShow[i] = false; 
            }
        }

        $scope.Inicializa = function(){
            $scope.set = new Set();
            for(var i =0;i<($scope.idImages.length / 2) ;i++){   
                do{
                    $scope.numero = $scope.getRandomSpan(20);
                }while($scope.set.has($scope.numero));
                    $scope.set.add($scope.numero);
                    $scope.idImages[i] = $scope.numero;
                    $scope.idImages[i+4] =$scope.numero;
            }
        }

        $scope.getRandomSpan = function(tamanho){
            return Math.floor((Math.random()*tamanho)+1);
        }

        $scope.ClickImg = function(id){
            if($scope.imageShow[id] == false){
                $scope.contaShow = true;
                $scope.idImageClick= id;
                $scope.InitResponde();
            }
        }

        $scope.Embaralha = function (a) {
            var j, x, i;
            for (i = a.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                x = a[i];
                a[i] = a[j];
                a[j] = x;
            }
            
            return a;
        }

        $scope.DefineNivel = function(nivel){
            var nivelTotal = 0;
            switch(nivel){
                case 'facil': 
                    nivelTotal = 10; 
                    break;
                case 'medio': 
                    nivelTotal = 100;
                    break;
                case 'dificil': 
                    nivelTotal = 1000;
                    break;
                defaul:
                    nivelTotal = 0;
                }

            return nivelTotal;
        };



        $scope.InitResponde = function(){
            $scope.resultShow = false;
            $scope.nivelJogo = $scope.DefineNivel($scope.nivel);
            $scope.operacao = $scope.modo;
            $scope.valor1= $scope.getRandomSpan($scope.nivelJogo);
            $scope.valor2= $scope.getRandomSpan($scope.nivelJogo);
            $scope.resultado = $scope.getResult($scope.valor1, $scope.valor2,$scope.operacao);

            $scope.results[0] = $scope.resultado -1; 
            $scope.results[1] = $scope.resultado + 1; 
            $scope.results[2] = $scope.resultado;
            $scope.results[3] = $scope.resultado + 2; 

            $scope.Embaralha($scope.results);
        }

        $scope.Responde = function(id){
            if($scope.results[id] == $scope.resultado){
                $scope.resposta = "Você acertou!!!";
                $scope.imageShow[$scope.idImageClick] = true;
                $scope.image[$scope.idImageClick]="jogo/img/img"+$scope.idImages[$scope.idImageClick] + ".png";
                $scope.pontos = $scope.pontos + 10;

                if($scope.idImage1 == null){
                    $scope.idImage1 = $scope.idImageClick;
                }else{

                    $scope.idImage2 = $scope.idImageClick;
                    if($scope.idImages[$scope.idImage1] == $scope.idImages[$scope.idImage2]){
                        setTimeout(function () {
                            $scope.$apply(function(){
                                $scope.pontos = $scope.pontos + 20;
                                $scope.idImage1 = null;
                                $scope.idImage2 = null;
                                $scope.resposta = "E acertou a combinação.";
                            });
                        }, 1000);

                    }else{
                        setTimeout(function () {
                            $scope.$apply(function(){
                                $scope.imageShow[$scope.idImage1] = false;
                                $scope.imageShow[$scope.idImage2] = false;
                                $scope.resposta = "Mas errou a combinação.";
                                $scope.idImage1 = null;
                                $scope.idImage2 = null;
                            });
                        }, 1000);

                    }
                }            
            }else{
                $scope.resposta = "Você errou! A resposta correta é " + $scope.resultado;
                if ($scope.pontos > 0){
                    $scope.pontos = $scope.pontos - 5;
                }

                if($scope.idImage1 != null){
                    $scope.imageShow[$scope.idImage1] = false;
                    $scope.imageShow[$scope.idImage2] = false;
                    $scope.idImage1 = null;
                    $scope.idImage2 = null;
                }
            }

            $scope.idImageClick = null;
            $scope.resultShow = true;
            setTimeout(function () {
                $scope.$apply(function(){
                    $scope.contaShow = false;
                });
            }, 2000);

            if($scope.VerificaTermino($scope.imageShow)){
                
                firebase.database().ref("jogo").push({
                    nivel: $scope.nivel,
                    modo: $scope.modo,
                    usuario: $scope.user.email,
                    pontos: $scope.pontos,
                    data: $scope.getDataHoje()
                });
                alert("Jogo finalizado");
                $location.path("/principal");
                $scope.$apply();
            }
        }

        $scope.getResult = function(valor1, valor2, ope){
            var resultado = 0;
           switch(ope){
                case '+': 
                   resultado = valor1 + valor2; 
                   break;
                case '-': 
                   resultado = valor1 - valor2; 
                   break;
                case '/': 
                   resultado = valor1 / valor2;
                   resultado = parseFloat(resultado.toFixed(2));
                   break;
                case '*': 
                   resultado = valor1 * valor2; 
                   break;
            };
                return resultado;
    }

        $scope.VerificaTermino = function(array){
            var cont = 0;
            for(var i =0;i < array.length;i++){
                if($scope.imageShow[i] == false){
                    cont++;
                }
            }
            
            
            if (cont == 0){
                return true;
            }else{    
                return false;
            }
        }

        $scope.getDataHoje = function() {
            var data = new Date();
            var dia = data.getDate();
            var mes = data.getMonth() + 1;
            var ano = data.getFullYear();
            return [dia, mes, ano].join('/');
        }

        $scope.Inicializa();
        $scope.EsconderImagens();
        $scope.Embaralha($scope.idImages);
        
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
        $location.path("/principal");
        $scope.$apply();
    }
    
    
}]);


