import './CreateAndRoom.css';
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';




function JoinRoom({setIsAuth, userName, socket, setInRoom, setRoomName}) {

  const [roomNameInput, setRoomNameInput] = useState('');
  const [instruction, setInstruction] = useState('Enter room name');

  useEffect(() => {
    socket.on("game_start", () =>{
      console.log("game started");
      setInRoom(true);
    });
    

    socket.on(("joined_room"), ()=>{
        setInstruction("Joined the room successfully, now start the game");
    })


   }, [socket]); // Add inRoom as a dependency 

  const handleLogOut = () => {
     Cookies.set('token', '')
     setIsAuth(false);
  }

  const handleStartGame = () => {
    if (roomNameInput.trim() !== '') {
      socket.emit('start_game',  roomNameInput );
      setInRoom(true);
      console.log("created room");
    }
  }

  const handleJoinRoom = () => {
    if(roomNameInput === ''){
      alert("Please enter room name and join room")
    }else{
      socket.emit('join_room', roomNameInput );
      setInstruction("Joining the room please wait")
      setRoomName(roomNameInput);
      console.log("Joined room");
    }
   
  };



  return (
    <div className="JoinAndCreateRoom">
      <h2 className='title'>Join a Room</h2>
      <h3 className="subtitle">{instruction}</h3>
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
        <button className="CndJbutton" onClick={handleStartGame}>Start Game</button>
        <button className="logout-button"onClick={handleLogOut}>Logout</button>
      </div>
    </div>
  );
}

export default JoinRoom;
