import express from 'express'
import { Server } from 'socket.io'
import http from 'http'

const Port = 8080
const app = express()
const server = http.createServer(app,{
    cors:{
        origin:"*"
    }
})
const io = new Server(server)

app.get('/',(req,res)=>{
    res.send("Based Sigma!👌")
})


server.listen(Port,()=>{
    console.log(`Server is Up and Listening to:\nhttps://localhost:${Port}`)
})

