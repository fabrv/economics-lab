var socket = io();
var movement = {
    up: false,
    down: false,
    left: false,
    right: false
}
document.addEventListener('keydown', function(event) {
    switch (event.keyCode) {
        case 65: // A
            movement.left = true;
            break;
        case 87: // W
            movement.up = true;
            break;
        case 68: // D
            movement.right = true;
            break;
        case 83: // S
            movement.down = true;
            break;
    }
});
document.addEventListener('keyup', function(event) {
    switch (event.keyCode) {
        case 65: // A
            movement.left = false;
            break;
        case 87: // W
            movement.up = false;
            break;
        case 68: // D
            movement.right = false;
            break;
        case 83: // S
            movement.down = false;
            break;
    }
});

socket.emit('new player');
setInterval(function() {
    socket.emit('movement', movement);
}, 1000 / 60);

var canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;
var context = canvas.getContext('2d');
socket.on('state', function(players) {
    context.clearRect(0, 0, 800, 600);
    context.fillStyle = 'green';
    for (var id in players) {
        var player = players[id];
        context.beginPath();
        context.arc(player.x, player.y, 10, 0, 2 * Math.PI);
        context.fill();
    }
});

// Server side input handler, modifies the state of the players and the
// game based on the input it receives. Everything runs asynchronously with
// the game loop.
io.on('connection', function(socket) {
    // When a new player joins, the server adds a new player to the game.
    socket.on('new-player', function(data, callback) {
        game.addNewPlayer(data.name, socket);
        io.sockets.emit('chat-server-to-clients', {
            name: '[Tank Anarchy]',
            message: data.name + ' has joined the game.',
            isNotification: true
        });
        callback();
        socket.emit('chat-server-to-clients', {
            name: '[Tank Anarchy]',
            message: 'Welcome, ' + data.name + '! Use WASD to move and click ' +
                'to shoot. Pick up powerups to boost your tank temporarily!',
            isNotification: true
        });
    });
});

// When a player disconnects, remove them from the game.
socket.on('disconnect', function() {
    var name = game.removePlayer(socket.id);
    io.sockets.emit('chat-server-to-clients', {
        name: '[Tank Anarchy]',
        message: name + ' has left the game.',
        isNotification: true
    });
});