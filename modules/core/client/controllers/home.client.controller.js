'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$mdSidenav', '$mdBottomSheet', '$mdDialog','$mdToast','$timeout','$mdMedia','Links','$rootScope',
  function($scope, Authentication,  $mdSidenav, $mdBottomSheet, $mdDialog, $mdToast, $timeout, $mdMedia,Links,$rootScope) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    var ul = this

    $scope.getLinks = function(){
      $scope.links = Links.query();
    }

    $scope.getLinks();

    $rootScope.categoLinks = ['entretenimiento','redes','ocio','estudio','otros'];

    /*$scope.links = [
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
    ]*/

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

    $rootScope.accionFormu = '';
    $scope.showFormu = function(ev,accionFormu,data) {
      $rootScope.accionFormu = angular.copy(accionFormu);
      $rootScope.newLink = angular.copy(data);
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
            if($rootScope.accionFormu === 'add'){
              Links.save({name:newLink.name,link:newLink.link,categoria:newLink.categoria,visible:newLink.visible,favorito:newLink.favorito},function(response){
                if(response.status){
                  $scope.getLinks();
                  console.log("agrego bien",response.link)
                }else{
                  console.log("fallo el agregar")
                }
              })
            }else if($rootScope.accionFormu === 'update'){
              Links.update({_id:newLink._id,name:newLink.name,link:newLink.link,categoria:newLink.categoria,visible:newLink.visible,favorito:newLink.favorito},function(response){
                if(response.status){
                  $scope.links.forEach(function(link){
                    if(link._id === newLink._id){
                      link.name = newLink.name;
                      link.link = newLink.link;
                      link.categoria = newLink.categoria;
                    }
                  });
                  console.log("actualizo bien")
                }else{
                  console.log("fallo el actualizar")
                }
              })
            }
          }, function() {
            $scope.status = 'You cancelled the dialog.';
          });
      $scope.$watch(function() {
        return $mdMedia('xs') || $mdMedia('sm');
      }, function(wantsFullScreen) {
        $scope.customFullscreen = (wantsFullScreen === true);
      });
    };

    $scope.favoritoLink = function(newLink,favo){
      Links.update({_id:newLink._id,name:newLink.name,link:newLink.link,categoria:newLink.categoria,visible:newLink.visible,favorito:favo},function(response){
        if(response.status){
          console.log("Favortito true")
          $scope.links.forEach(function(link){
            if(link._id === newLink._id){
              link.favorito = favo;
            }
          })
        }else{
          console.log("Favortito false")
        }
      })
    }

    $scope.deleteLink = function(idLink){
      $scope.links.forEach(function(link,index){
        if(link._id === idLink){
          link.$remove(function(response){
            if(response.status){
              console.log("Se elimino",response.link)
              $scope.links.splice(index,1)
            }else{
              console.log("Fallo al eliminar")
            }
          })
        }
      })
    }



  }

]);

function DialogController($scope, $mdDialog,$rootScope) {

  $scope.categoLinks = $rootScope.categoLinks;
  $scope.accionFormu = $rootScope.accionFormu;
  $scope.newLink = $rootScope.newLink;



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
    if($scope.accionFormu === 'add'){
      newLink.visible = true;
      newLink.favorito = false;
      $mdDialog.hide(newLink);
    }else if ($scope.accionFormu === 'update'){
      $mdDialog.hide(newLink);
    }
  }


}
