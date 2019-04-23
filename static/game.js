var socket = io();
let socket = io.connect('http://localhost:<portNumber>');
console.log(socket.id); // undefined
socket.on('connect', () => {
    console.log(socket.id); // an alphanumeric id...
});

document.getElementById("available").innerHTML =1;
