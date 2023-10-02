import './CreateAndRoom.css';
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:3001');


function JoinRoom({setIsAuth, userName}) {
  const [roomName, setRoomName] = useState('');

   
  const handleLogOut = () => {
     Cookies.set('token', '')
     setIsAuth(false);
  }

  const handleCreateRoom = () => {
    if (roomName.trim() !== '') {
      socket.emit('create_room', { roomName });
      console.log("created room");
    }
  }

  const handleJoinRoom = () => {
    socket.emit('join_room', { roomName });
    console.log("Joined room");
  };

  return (
    <div className="JoinAndCreateRoom">
      <h2 className='title'>Join a Room</h2>
      <h4 className='userName' >Player: {userName}</h4> {/* Display the userName here */}
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter room name"
          className="input-box"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
      </div>
      <div className="button-container">
        <button className="CndJbutton" onClick={handleJoinRoom}>Join Room</button>
        <button className="CndJbutton" onClick={handleCreateRoom}>Create Room</button>
        <button className="logout-button"onClick={handleLogOut}>Logout</button>
      </div>
    </div>
  );
}

export default JoinRoom;
