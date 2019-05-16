const portNumber = 5000
let socket = io.connect(`http://localhost:${portNumber}`);

socket.on('connect', () => {
  console.log(`player id: ${socket.id}`); // an alphanumeric id...
  document.getElementById('player-id').innerHTML = socket.id

  socket.on('fullLobby', (data) => {
    alert(data);
  })

  socket.on('updateInfo', (data) => {
    const names = ['A', 'B', 'C']
    for (let i = 0; i < names.length; i++) {
        document.getElementById(`available${names[i]}`).value = data.companies[i].shares;
        document.getElementById(`price${names[i]}`).value = data.companies[i].price;
    }
  });
});

// document.getElementById("available").innerHTML =1;
