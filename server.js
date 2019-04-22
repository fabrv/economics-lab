// Dependencies.
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));

// Routing
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});

// Starts the server.
server.listen(5000, function() {
  console.log('Starting server on port 5000');
});

/**
 * Server side input handler, modifies the state of the players and the
 * game based on the input it receives. Everything here runs asynchronously.
 */
io.on('connection', (socket) => {
  socket.on('player-join', () => {
    game.addNewPlayer(socket);
  });

  socket.on('player-action', (data) => {
    game.updatePlayerOnInput(socket.id, data);
  });

  socket.on('disconnect', () => {
    game.removePlayer(socket.id);
  })
});

/**
 * Server side game loop. This runs at 60 frames per second.
 */
setInterval(() => {
  game.update();
  game.sendState();
}, 1000 / FPS);

