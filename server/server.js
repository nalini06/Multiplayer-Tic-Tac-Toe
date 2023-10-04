const express = require('express');
const app = express();
const http = require('http');
const authRouter = require('./routes/authRouter')
const gameRoute = require('./routes/saveGame')
const connectDB = require('./db/connect')
const {Server} = require('socket.io');
const cors = require('cors')
app.use(cors());
const server = http.createServer(app);
app.use(express.json())
require('dotenv').config()



app.use('/api/users', authRouter);
app.use('/api/game', gameRoute)


const io = new Server( server, {
  cors: {
    origin: "https://tic-tac-toe-client-1fru.onrender.com",
    methods: ["GET", "POST"]
  }
} );

let rooms = new Map();




io.on("connection", (socket) =>{
     console.log("user connected into " +socket.id);
     
     socket.on("start_game", (data) =>{
      const username = data.username;
      const roomName = data.roomName;
      const clientsInRoom = io.sockets.adapter.rooms.get(data);
      console.log(`Clients in room ${data}:`, clientsInRoom);
      const payLoad = {
        "startedBy" : username
      }
      socket.in(roomName).emit("game_start", payLoad);
     })

     socket.on('join_room', (data) => {
      socket.join(data.roomName);
      socket.emit("joined_room");
      console.log(`Usesr with id: ${socket.id} joined room: ${data}`);
   });

     
     socket.on("send_data", (payLoad) =>{
      const roomName = payLoad.roomName;
      console.log(payLoad);
      socket.in(roomName).emit("receive_message", payLoad);
     })

     socket.on("won" , (payLoad) => {
      const roomName = payLoad.roomName;
         socket.to(roomName).emit("winner", payLoad)  
     })

     socket.on("disconnect", (socket) =>{
      console.log("User disconnected " + socket.id);
     })
})


const start = async () =>{
  try{
      await connectDB(process.env.url)
      server.listen(3001, ()=>{
          console.log(`Server started listening on port ${3001}`);
      })
  }catch(error){
      console.log(error);
  }
}

start();