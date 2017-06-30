const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, '/index-ws.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .use(express.static(path.join(__dirname, '/')))
  .get('*',function(req,res){
    res.sendFile(path.join(__dirname + '/index-ws.html'));
    //__dirname : It will resolve to your project folder.
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));



const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);

    ws.send('answer' + Math.random());
  });

  setInterval(() => {
    ws.send('something' + Math.random());
  }, 5000);
});