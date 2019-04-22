var socket = io();
let socket = io.connect('http://localhost:<portNumber>');
console.log(socket.id); // undefined
socket.on('connect', () => {
    console.log(socket.id); // an alphanumeric id...
});

var input1 = new CanvasInput({
    canvas: document.getElementById('accionesempresaB')
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

