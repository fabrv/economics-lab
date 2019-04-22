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

var players = {};
io.sockets.on('connect', function(socket) {
  var sessionid = socket.id;
});


// Insert username & password into 'user'
function insertUser(user, pass) {
  return knex('user').insert({
    username: user,
  }).then(function() {
    rl.prompt();
  });
}

// Create new user
function createNewUser() {
  rl.question('Username ›› ', function(username) {
      insertUser(username, password);
      rl.prompt();
    });
}

// Ask if user is new
rl.question('Are you a new user? ', function(answer) {
  if (answer.match(/^y(es)?$/i)) {
    createNewUser();
  } else {
    rl.prompt();
  }
});