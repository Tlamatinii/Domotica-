angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Madre de Timmy',
    lastText: 'Che, pendejos: Hay que comprar leche, haceme acordar a la tarde',
    face: 'img/Madre.jpg'
  }, {
    id: 1,
    name: 'Padre de Timmy',
    lastText: 'Me quede sin laburo de nuevo, vas a tener que trabajar de nuevo de noche hijo...',
    face: 'img/Padre.jpg'
  }, {
    id: 2,
    name: 'Hermano de Timmy',
    lastText: '404 brother not found',
    face: 'img/Hermano.jpg'
  }, {
    id: 3,
    name: 'Perro de Timmy',
    lastText: 'DENME DE COMER HIJOS DE... digo WOF WOF manga de pusilanimes.',
    face: 'img/Perro.jpg'
  }, {
    id: 4,
    name: 'El supuesto Timmy',
    lastText: 'Hello darkness my old friend',
    face: 'img/Yee.jpg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
