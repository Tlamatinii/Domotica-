// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})


.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'puertas': {
        templateUrl: 'templates/Dispositivos.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'principal': {
          templateUrl: 'templates/Principal.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'integrantes': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'integrantes': {
        templateUrl: 'templates/Integrantes.html',
        controller: 'ChatsCtrl'
      }
    }
  })

  
  .state('about', {
    url: '/Creadores',
    controller: 'AboutCtrl',
    templateUrl: 'templates/menuCostado/Creadores.html'
  })

  .state('IniciarSesion', {
    url: '/InicioSesion',
    controller: 'AboutCtrl',
    templateUrl: 'templates/menuCostado/InicioSesion.html'
  })

  
  .state('Contacto', {
    url: '/contacto',
    controller: 'AboutCtrl',
    templateUrl: 'templates/menuCostado/Contacto.html'
  })
  
  
  
  .state('tab2', {
    url: '/tab2',
    abstract: true,
    templateUrl: 'templates/disp/tabs2.html'
  })

  .state('tab2.abrir', {
    url: '/abrir',
    views: {
      'abrir': {
        templateUrl: 'templates/disp/Abrir.html',
        controller: 'ChatsCtrl'
      }
    }
  })

  .state('tab2.estado', {
    url: '/estado',
    views: {
      'estado': {
        templateUrl: 'templates/disp/Estado.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab2.luces', {
      url: '/luces',
      views: {
        'luces': {
          templateUrl: 'templates/disp/Luces.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/chats');

})

.config(['$ionicConfigProvider', function($ionicConfigProvider) {
  
      $ionicConfigProvider.tabs.position('bottom'); // other values: top
  
  }])

  .controller('TabsCtrl', function($scope, $ionicSideMenuDelegate) {
    
    $scope.openMenu = function () {
      $ionicSideMenuDelegate.toggleLeft();
    }
    
  })

  
  
  .controller('AboutCtrl', function($scope, $ionicSideMenuDelegate, $location) {
    $scope.openMenu = function () {
      $ionicSideMenuDelegate.toggleLeft();
    }

    $scope.go = function ( path ) {
      $location.path( path );
    };
  })
  
  .controller('HomeTabCtrl', function($scope, $ionicSideMenuDelegate) {
    
    })


    .controller('MyCtrl', function($scope, $timeout) {
      $scope.myTitle = 'Template';
      
      $scope.data = { 'volume' : '5' };
      
      var timeoutId = null;
      
      $scope.$watch('data.volume', function() {
          
          
          console.log('Has changed');
          
          if(timeoutId !== null) {
              console.log('Ignoring this movement');
              return;
          }
          
          console.log('Not going to ignore this one');
          timeoutId = $timeout( function() {
              
              console.log('It changed recently!');
              
              $timeout.cancel(timeoutId);
              timeoutId = null;
              
              // Now load data from server 
          }, 1000); 
          
          
      });
      
      $scope.toggleTopMenu = function () {
        var menu = document.getElementsByTagName('ion-top-menu')[0];
        var pane = document.getElementsByTagName('ion-pane')[0];
        menu.style.height = pane.style.top = (menu.offsetHeight==0)?'300px':'0px';
      };
  });

  


