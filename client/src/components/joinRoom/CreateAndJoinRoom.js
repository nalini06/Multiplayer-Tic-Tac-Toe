import './CreateAndRoom.css';
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';




function JoinRoom({setIsAuth, userName, socket, setInRoom, setRoomName}) {

  const [roomNameInput, setRoomNameInput] = useState('');

  useEffect(() => {
    socket.on("game_start", () =>{
      console.log("game started");
      setInRoom(true);
    });
   }, [socket]); // Add inRoom as a dependency 

  const handleLogOut = () => {
     Cookies.set('token', '')
     setIsAuth(false);
  }

  const handleCreateRoom = () => {
    if (roomNameInput.trim() !== '') {
      socket.emit('start_game',  roomNameInput );
      setInRoom(true);
      console.log("created room");
    }
  }

  const handleJoinRoom = () => {
    socket.emit('join_room', roomNameInput );
    setRoomName(roomNameInput);
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
          value={roomNameInput}
          onChange={(e) => setRoomNameInput(e.target.value)}
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
