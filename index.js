const express = require("express");

const app = express();
const server = require("http").Server(app);

// Socket setup
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    socket.broadcast.emit('chat message', msg);
    // io.emit('chat message', msg);
  });

  socket.on('disconnect', (user) => {
    socket.broadcast.emit('disconnected user', user);
    // console.log(`${user} disconnected`);
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
