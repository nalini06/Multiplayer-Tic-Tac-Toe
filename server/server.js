const express = require('express');
const app = express();
const http = require('http');
const authRouter = require('./routes/authRouter')
const saveGameRoute = require('./routes/saveGame')
const connectDB = require('./db/connect')
const {Server} = require('socket.io');
const cors = require('cors')
app.use(cors());
const server = http.createServer(app);
app.use(express.json())
require('dotenv').config()



app.use('/api/users', authRouter);
app.use('/api/game', saveGameRoute)


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
      socket.join(roomData.roomName);
      console.log(rooms);
      socket.emit('room_created', roomData);
      console.log("Room Created for " + roomData);
     })

     socket.on("start_game", (data) =>{
      const clientsInRoom = io.sockets.adapter.rooms.get(data);
      console.log(`Clients in room ${data}:`, clientsInRoom);
      socket.in(data).emit("game_start");
     })

     socket.on('join_room', (data) => {
      socket.join(data);
      console.log(`Usesr with id: ${socket.id} joined room: ${data}`);
   });

  /*

     socket.on('join_room', (roomData) => {
      const roomName = roomData.roomName;
      if (rooms.has(roomName)) {
        const room = rooms.get(roomName);
        socket.join(roomName);
        room.players.push(socket.id);
        console.log(rooms);
        const clientsInRoom = io.sockets.adapter.rooms.get(roomName);
        console.log(`Clients in room ${roomName}:`, clientsInRoom);
        // Notify both players in the room that the game can start
        io.in("1234").emit("game_start");
        console.log("Connected to both rooms");
      } else {
        // Notify the client that the room doesn't exist
        console.log("not found room");
        socket.emit('room_not_found');
      }
    });

    */
     
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