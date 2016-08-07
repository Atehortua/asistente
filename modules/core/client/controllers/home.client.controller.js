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

    $scope.showFormu = function(ev) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'formulario-links.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: useFullScreen
      })
          .then(function(newLink) {
            /* aca va la funcion a la base de datos */
            $scope.links.push(newLink)
          }, function() {
            $scope.status = 'You cancelled the dialog.';
          });
      $scope.$watch(function() {
        return $mdMedia('xs') || $mdMedia('sm');
      }, function(wantsFullScreen) {
        $scope.customFullscreen = (wantsFullScreen === true);
      });
    };


  }

]);

function DialogController($scope, $mdDialog) {

  $scope.categoLinks = ['entretenimiento','redes','ocio','estudio'];

  /**
   * cerrar el dialogo
   */
  $scope.hide = function() {
    $mdDialog.hide();
  };

  /**
   * cerrar el dialogo
   */
  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.agregarLink = function(newLink){
    newLink.visible = true;
    newLink.favorito = false;
    $mdDialog.hide(newLink);
  }


}
