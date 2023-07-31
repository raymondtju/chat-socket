const express = require("express");

const app = express();
const server = require("http").Server(app);

// Socket setup
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.broadcast.emit("listen", `${socket.id} has joined the chat`);

  socket.on("chat", (msg) => {
    socket.broadcast.emit("listen", msg);
  });

  socket.on("disconnect", (user) => {
    socket.broadcast.emit("listen", `${socket.id} has left the chat`);
  });

  socket.on("statusType", (status) => {
    if (status === "typing") {
      socket.broadcast.emit("typing", `${socket.id} is typing ...`);
    }
    else if (status === "notTyping") {
      socket.broadcast.emit("typing", ``);
    }
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
