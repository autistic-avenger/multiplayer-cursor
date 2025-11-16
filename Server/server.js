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

let users = {}

app.get('/', (req, res) => {
  res.send("Based Sigma!👌")
})

io.on("connection", (socket) => {
  console.log(socket.id, "Connected 👾");

  users[socket.id] = [0, 0];

  socket.on("positions", (data) => {
    users[socket.id] = [data.x, data.y];
    io.emit("updatedPos", users);
  });

  socket.on("disconnect", () => {
    delete users[socket.id];
    console.log(socket.id, "Disconnected 👾");
  });
});

server.listen(Port, () => {
  console.log(`Server listening on http://localhost:${Port}`);
});
