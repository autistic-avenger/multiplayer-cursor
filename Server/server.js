import express from 'express'
import { Server } from 'socket.io'
import http from 'http'

const Port = 8080
const app = express()
const server = http.createServer(app)

const io = new Server(server,{
  cors: {
    origin: "*",   
    methods: ["GET", "POST"]
  }})
let users = {}

app.get('/',(req,res)=>{
    res.send("Based Sigma!👌")
})
io.on("connection",(socket)=>{
    console.log(socket.id ,"Connected 👾" );
    users[socket.id] = [undefined,undefined]

    socket.on("disconnect",()=>{
        delete users[socket.id];
        console.log(socket.id ,"Disconnected 👾");
        
    })
        
})



server.listen(Port,()=>{
    console.log(`Server is Up and Listening to:\nhttps://localhost:${Port}\n\n`)
})

