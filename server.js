console.log('Starting ....');

const express = require('express')
const WebSocket = require('ws');
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express()
const port = 4567

app.use(express.static('public'));
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(bodyParser.text());


// app.get('/message', (req, res) => {
//   res.send('Hello World! ' + new Date().toISOString())
// })

app.post('/message', (req, res) => {
  console.log('POST received', req.body);
  const meldung =  req.body;
  const date = new Date().toLocaleTimeString();
  res.send(`Ig ha vo dir becho (${date}): ${meldung}` )
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})




const wss = new WebSocket.Server({ port: 8080 });

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
