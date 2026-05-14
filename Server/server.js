import express from 'express'
import { Server } from 'socket.io'
import http from 'http'

const Port = 8080
const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

let users = {};

io.on("connection", (socket) => {
  console.log(socket.id, "Connected");

  socket.on("join", (userData) => {
    users[socket.id] = {
      id: socket.id,
      name: userData.name || "Anonymous",
      color: userData.color || "#000000",
      x: 0,
      y: 0,
    };
    console.log(`${users[socket.id].name} (${socket.id}) Joined!`);
    io.emit("updatedUsers", users);
  });

  socket.on("positions", (data) => {
    if (users[socket.id]) {
      users[socket.id].x = data.x;
      users[socket.id].y = data.y;
      socket.broadcast.emit("updatedPos", { id: socket.id, x: data.x, y: data.y });
    }
  });

  socket.on("click", (data) => {
    if (users[socket.id]) {
      io.emit("userClicked", { id: socket.id, x: data.x, y: data.y, color: users[socket.id].color });
    }
  });

  socket.on("disconnect", () => {
    if (users[socket.id]) {
      console.log(users[socket.id].name, "Left!");
      delete users[socket.id];
      io.emit("updatedUsers", users);
    }
  });
});

server.listen(Port, () => {
  console.log(`Server listening on http://localhost:${Port}`);
});
