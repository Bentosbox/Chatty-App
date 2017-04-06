const express = require('express');
const SocketServer = require('ws').Server;
const webSocket = require('ws');
const uuid = require('node-uuid');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
// const sockets = {};
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
// const socketId = nextSocketId;
  // nextSocketId ++;
  console.log('Client connected');



  ws.on('message', (message) => {
    console.log("received by web server")
    // const newMessage = JSON.parse(ws);
    console.log("this is from websocket: " + message)

    let parseData = JSON.parse(message);
    var sendMessage = {id: uuid.v4(), username: parseData.username, content: parseData.content}
    console.log(sendMessage)
    // wss.broadcast = function broadcast(data) {
    wss.clients.forEach((client) => {
    // console.log(client.readyState)
    console.log(webSocket.OPEN)
     // if (client !== ws && client.readyState === webSocket.OPEN) {
      if (client.readyState === webSocket.OPEN) {
        console.log("sending Broadcast")
        client.send(JSON.stringify(sendMessage));
      }
    });
// };
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});