const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3000 });
let clients = [];

wss.on('connection', function(ws) {
  clients.push(ws);
  console.log('Device connected! Total:', clients.length);

  ws.on('message', function(data) {
    console.log('Message aya:', data.toString());
    // Baaki sab clients ko bhejo
    clients.forEach(function(client) {
      if (client !== ws && client.readyState === 1) {
        client.send(data.toString());
        console.log('Message forward kiya!');
      }
    });
  });

  ws.on('close', function() {
    clients = clients.filter(c => c !== ws);
    console.log('Device disconnected. Total:', clients.length);
  });

  ws.on('error', function(err) {
    console.log('Error:', err);
  });
});

console.log('BlueChat Server chal raha hai port 3000 pe!');