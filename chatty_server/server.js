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
const wss = new SocketServer({server});
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('message', (message) => {
    console.log("received by web server")
    let parseData = JSON.parse(message);

    if (parseData.type = "postMessage") {
      var sendMessage = {
        type: "incomingMessage",
        id: uuid.v4(),
        username: parseData.username,
        content: parseData.content
      }
      wss.clients.forEach((client) => {
      console.log(webSocket.OPEN)
        if (client.readyState === webSocket.OPEN) {
          console.log("sending Broadcast")
          client.send(JSON.stringify(sendMessage));
        }
      });
    }

    else if (parseData.type = "postNotification") {
      var sendNotification = {
        type: "incomingNotification",
        id: uuid.v4(),
        username: parseData.nameNotification,
        }
      wss.clients.forEach((client) => {
        if (client.readyState === webSocket.OPEN) {
          console.log("sending Broadcast")
          client.send(JSON.stringify(sendNotification));
        }
      });
    }

    console.log(parseData)
    console.log(sendMessage)
    // wss.broadcast = function broadcast(data) {
    // }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});