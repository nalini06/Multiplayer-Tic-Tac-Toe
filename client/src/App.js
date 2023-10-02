import { useState, useEffect } from 'react';
import './App.css';
import TicTacToe from './components/TIcTacToe/TicTacToe';
import JoinRoom from './components/joinRoom/CreateAndJoinRoom';
import io from 'socket.io-client';
import LoginSignup from './components/Auth/LoginSignUp';
import Cookies from 'js-cookie';
const socket = io.connect('http://localhost:3001');

function App() {
  const [inRoom, setInRoom] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [userName, setUserName] = useState('');
  

  useEffect(() => {
    const handleGameStart = () => {
      setInRoom(true);
      console.log("Here");
    };

    const handleRoomLimitExceeded = () =>{
      if(!inRoom){
        alert("Room Limit exceeded, try another room code");
      }
      
    }

    socket.on("game_start", handleGameStart);
    socket.on("limit_exceeded", handleRoomLimitExceeded)

    

    return () => {
      // Clean up the event listener when the component unmounts
      socket.off("game_start", handleGameStart);
    };
  }, []);
  


  return (
    <div>
      {isAuth ? inRoom ? (
        <TicTacToe userName={userName} />
      ) : (
        <JoinRoom setIsAuth={setIsAuth} userName={userName}/>
      ) : <LoginSignup setIsAuth={setIsAuth} setUserName={setUserName} />
      }
    </div>
  );
}

export default App;
