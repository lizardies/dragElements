const path = require('path')
const express = require('express')
const WebSocket = require('ws')

// new object for states
let state = {}

// const app = express()

// app.use('/', express.static(path.join(__dirname, 'public_html')))

// app.listen(2000)

//new websocket on port 2001
const wss = new WebSocket.Server({ port: 2001 })



wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data)

    }
  })
  console.log(client.send(data))
} 

// on websocket connection,
wss.on('connection', function connection(ws) {


  ws.send(JSON.stringify(state));

  // on dragging (changing events)
  ws.on('message', function incoming(data) {

    // picks up position from both elements from client side
    state = JSON.parse(data);

    // send the current positions to each client with website open 
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data)
   
      }
    }) 
  }) 

 
  //show in server terminal how many windows are open
  console.log(wss.clients.size)
})


