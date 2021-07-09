console.log('Starting ....');
const express = require('express');
const { Server } = require('ws');

const PORT = process.env.PORT || 3000;

const server = express()
  .use(express.static('public'))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });
const connections = [];
wss.on('connection', function connection(ws) {
  console.log('Connection');
  connections.push(ws);
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    const date = new Date().toLocaleTimeString();
    for(const connection of connections){
      console.log('Sending: ' + message);
      connection.send(`Öppis isch i chatcho (${date}): ${message}`)
    }
  });
  ws.on('close', function() {
    console.log('Connection Closed');
  });
  // setInterval(() => {
  //   ws.send(new Date().toLocaleTimeString());
  // }, 1000);
});
