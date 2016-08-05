'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$mdSidenav', '$mdBottomSheet', '$mdDialog','$mdToast','$timeout','$mdMedia',
  function($scope, Authentication,  $mdSidenav, $mdBottomSheet, $mdDialog, $mdToast, $timeout, $mdMedia) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    var ul = this

    $scope.categoLinks = ['entretenimiento','redes','ocio','estudio'];

    $scope.links = [
      {name:'Google',
        categoria:$scope.categoLinks[0],
        link:'https://www.google.com.co',
        visible:true,
        favorito:false
      },
      {name:'Google2',
        categoria:$scope.categoLinks[3],
        link:'https://www.google.com.co',
        visible:true,
        favorito:false
      },{name:'Google3',
        categoria:$scope.categoLinks[2],
        link:'https://www.google.com.co',
        visible:true,
        favorito:false
      },{name:'Soogle4',
        categoria:$scope.categoLinks[2],
        link:'https://www.google.com.co',
        visible:true,
        favorito:false
      }
    ]

    $scope.filtroLinks = "";
    $scope.filtrarLinks = function() {
      var matcher = new RegExp($scope.filtroLinks.toUpperCase());
      var match = false;
      $scope.links.forEach(function(link,index){
        var cadena = link.name.toUpperCase();
        cadena = cadena.toString();
        console.log(cadena.match(matcher))
        if(cadena.match(matcher)){
          $scope.links[index].visible = true;
        }else{
          $scope.links[index].visible = false;
        }
      });
    }

    $scope.getFavoriteLinks = function(){
      var c = 0;
      $scope.links.forEach(function(link){
        if(link.favorito){
          c += 1;
        }
      })
      return c;
    }

    $scope.getVisibleLinks = function(){
      var c = 0;
      $scope.links.forEach(function(link){
        if(link.visible){
          c += 1;
        }
      })
      return c;
    }

    $scope.getCategoriaLinks = function(){

      var a = [];
      var b = [];
      $scope.links.forEach(function(link){
        $scope.categoLinks.forEach(function(catego){
          if(link.categoria === catego){
            a.push(catego);
          }
        })
      })
      for(var i = 0;i < a.length;i++){
        if(b.indexOf(a[i])===-1){
          b.push(a[i]);
        }
      }

      return b.length
    }


  }

]);
