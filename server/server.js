const express = require('express');
const app = express();
const http = require('http');
const authRouter = require('./routes/authRouter')
const connectDB = require('./db/connect')
const {Server} = require('socket.io');
const cors = require('cors')
app.use(cors());
const server = http.createServer(app);
app.use(express.json())
require('dotenv').config()



app.use('/api/users', authRouter);


const io = new Server( server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
} );

let rooms = new Map();

io.on("connection", (socket) =>{
     console.log("user connected into " +socket.id);
     
     socket.on("create_room", (roomData) =>{

      rooms.set(roomData.roomName, {players: [socket.id]})
      console.log(rooms);
      socket.emit('room_created', roomData);
      console.log("Room Created for " + roomData);
     })

     socket.on('join_room', (roomData) =>{
      const roomName = roomData.roomName;
      if (rooms.has(roomName)) {
        // Join the room
        if(rooms.get(roomName).players.length == 2){
           socket.broadcast.emit("limit_exceeded");
           return;
        }
        socket.join(roomName);
        rooms.get(roomName).players.push(socket.id);
        console.log(rooms);
        // Notify both players in the room that the game can start
        socket.broadcast.emit('game_start', roomData);
        console.log("Connected to both rooms");
      } else {
        // Notify the client that the room doesn't exist
        console.log("not found room");
        socket.emit('room_not_found');
      }
     })

     
     socket.on("send_data", (data) =>{
      console.log(data);
      socket.broadcast.emit("receive_message", data)
     })

     socket.on("won" , (payLoad) => {
         socket.broadcast.emit("winner", payLoad)  
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