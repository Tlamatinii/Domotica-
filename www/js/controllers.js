angular.module('starter.controllers', [])


.controller('DashCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.openMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  }
})

.controller('ChatsCtrl', function($scope, Chats, $ionicSideMenuDelegate) {
  $scope.openMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  }
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
  Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats, $ionicSideMenuDelegate) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, $ionicPopup, $timeout, $ionicSideMenuDelegate) {
  $scope.settings = {
    enableFriends: true
  };
  $scope.openMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  }
  $scope.showSelectValue = function(mySelect) {
    console.log(mySelect);
}

}
)


//Controlador de la conexion al WEBSOCKET.
.controller('MainCtrl', function($scope, $document, $ionicPopup, $timeout, $ionicSideMenuDelegate, $location) {
  
  $scope.openMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  }

  $scope.go = function ( path ) {
    $location.path( path );
  };

  

  console.log('MainCtrl loaded.'); // Output to the log so we know when our controller is loaded.
    // Define the URL for our server. As we are only running it locally, we will
    // use localhost.
    var SERVER_URL = 'ws://192.168.0.103:81';
    // This is a variable for our WebSocket.
    var ws;
         // Set the message log and the name input to blank.
    var random = Math.floor((Math.random() * 6) + 1);
    $scope.userName = '';
    $scope.messageLog1 = '';
    $scope.messageLog2 = '';
    $scope.messageLog3 = '';
    $scope.messageLog4 = '';
    $scope.tutorial = '';
    console.log(random)
  
    if(random == 1){
      $scope.messageRobot = 'Hola Señor';
    }
    else if(random == 2){
      $scope.messageRobot = 'Yee robot prepared';
    }
    else if(random == 3){
      $scope.messageRobot = 'Es bastante copado todo lo que digo';
    }
    else if(random == 4){
      $scope.messageRobot = 'FUNCIONO';
    }
    else if(random == 5){
      $scope.messageRobot = 'Mensaje no disponible.';
    }
    else if(random == 6){
      $scope.messageRobot = 'Mi otro creador ni me conoce.';
    }
    else
    {
      $scope.messageRobot = 'Mi creador no me ama.';
    }

    if(random == 1){
      $scope.messageRobot2 = 'Hola: Si quiere controlar las ventanas vaya al panel izquierdo. Sino, puede controlar de manera mas eficiente la luces en el panel derecho';
    }
    else if(random == 2){
      $scope.messageRobot2 = 'Algunos me dicen inutil... pues yo pienso lo mismo';
    }
    else if(random == 3){
      $scope.messageRobot2 = 'Podrian hacer que cambie mi mensaje cada cierto tiempo; Pero mis creadores son unos vagos.';
    }
    else if(random == 4){
      $scope.messageRobot2 = 'Hola, de nuevo';
    }
    else if(random == 5){
      $scope.messageRobot2 = 'Interesante humano tenemos en frente.';
    }
    else if(random == 6){
      $scope.messageRobot2 = 'Si, no soy una IA, solo simulo ser una.';
    }
    else
    {
      $scope.messageRobot2 = 'Mi creador no me ama... en serio.';
    }
    
    
    /** This function initiates the connection to the web socket server. */
    function connect() {
        // Create a new WebSocket to the SERVER_URL (defined above). The empty
        // array ([]) is for the protocols, which we are not using for this
        // demo.
        ws = new WebSocket(SERVER_URL, []);
        // Set the function to be called when we have connected to the server.
        ws.onopen = handleConnected;
        // Set the function to be called when an error occurs.
        ws.onerror = handleError;


                ws.onmessage = MsjRecibido;
                // Set the function to be called when we have connected to the server.
    }

//

    /**
        This is the function that is called when the WebSocket connects
        to the server.
    */

          /** This function adds a message to the message log. */
    function logMessage(msg) {
        // $apply() ensures that the elements on the page are updated
        // with the new message.
        $scope.$apply(function() {
            //Append out new message to our message log. The \n means new line.
            $scope.messageLog = '';
            $scope.messageLog = $scope.messageLog + msg + "\n";
        });
    }

//

    function MsjRecibido(data) {
        // Simply call logMessage(), passing the received data.
        console.log(data); //muestra por consola
        //simpley call logmessage(), passing the received data
        logMessage(data.data);
    }
          /**
        This is the function that is called when the WebSocket connects
        to the server.
    */
    function handleConnected(data) {
        // Create a log message which explains what has happened and includes
        // the url we have connected too.
        var logMsg = 'Connected to server: ' + data.target.url;
    }
 
    /**
        This is the function that is called when an error occurs with our
        WebSocket.
    */
    function handleError(err) {
        // Print the error to the console so we can debug it.
        console.log("Error: ", err);
    }
      //trying

    $scope.submitValue = function submitValue(ip) {
        // Call our connect() function.
        SERVER_URL = 'ws://' + ip + ':81';
        console.log("ip asignada a SERVER_URL:" + SERVER_URL);
        connect();   
    }   //trying

     /** This is the scope function that is called when a user hits send. */
    $scope.sendMessage = function sendMessage(msg) {
      //connect(); // No funciona al estar aca (probar conectar al iniciar app o template)
        // Create a variable for our message (append their message to their name).
        // Send the data to our WebSocket connection.
        console.log(msg);
        ws.send(msg); 
    
    }


    $scope.showPopup = function() {
      $scope.data = {};
    
      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        template: '<input type="text" ng-model="data.ip">',
        title: 'Ingrese la ip de su dispositivo',
        subTitle: 'Ejemplo 192.168.1.10',
        scope: $scope,
        buttons: [
          { text: 'Cancelar' },
          {
            text: '<b>Confirmar</b>',
            type: 'button-positive',
            onTap: function(e) {
              if ($scope.data.ip) {
                return $scope.data.ip;
                
              }
            }
          }
        ]
      }) 
      
      myPopup.then(function(ip) {
        
        SERVER_URL = 'ws://' + ip + ':81';
        console.log("ip asignada a SERVER_URL:" + SERVER_URL);
        connect();
        $location.path('/tab2/estado');
      });
    };
})

;



function ContentController($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  $scope.drag = function(value) {
    $scope.years = Math.floor(value / 12);
    $scope.months = value % 12;
};

$scope.rangeValue = 0;
};



