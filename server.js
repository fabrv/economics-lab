// Dependencies.
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

const game = require('./Gamelogic/Company');

app.set('port', 5000);
app.use('/', express.static(__dirname + '/'));

// Starts the server.
server.listen(5000, () => {
  console.log('Starting server on port 5000 \n');
});

var players = [];

io.on('connect', (socket) => {
  if (players.length < 2) {
    addNewPlayer(socket.id);
  } else {
    console.log(`Lobby está lleno, ${socket.id} se quedó afuera.`);
    socket.emit('fullLobby', 'Juego está lleno.');
  }

  socket.on('disconnect', () => {
    removePlayer(socket.id);
  })
});

function addNewPlayer (id) {
  console.log(`Nuevo jugador: ${id}`);
  players.push({
    id: id,
    x: 300,
    y: 300
  });
}

function removePlayer (id) {
  console.log(`Jugador desconectado, ${id}`);
  const playerLeaving = players.find( (player) => {return player.id === id});
  const playerLeavingIndex = players.indexOf(playerLeaving);

  if (playerLeavingIndex > -1) {
    players.splice(playerLeavingIndex, 1);
  }
}

function updateInformation () {
  data = [
    {
      'available': game.default.companyA
    }
  ]
  io.emit('dataDisplay', data)
}