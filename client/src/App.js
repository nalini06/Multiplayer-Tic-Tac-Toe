import { useState, useEffect } from 'react';
import './App.css';
import TicTacToe from './components/TIcTacToe/TicTacToe';
import JoinRoom from './components/joinRoom/CreateAndJoinRoom';
import OfflineTicTacToe from './components/offlineTicTacToe/OfflineTicTacToe'
import io from 'socket.io-client';
import LoginSignup from './components/Auth/LoginSignUp';
import Cookies from 'js-cookie';
import GameMenu from './components/gameMenu/GameMenu';
const socket = io.connect('http://localhost:3001');

function App() {
  let componentToRender;
  const [inRoom, setInRoom] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [userName, setUserName] = useState('');
  const [online, setOnline] = useState(false);
  const [gameMenu, setGameMenu] = useState(false);
  const [offline, setOffline] = useState(false);
  const [resumeGame, setResumeGame] = useState(false);
  const [gameState, setGameState] = useState([]);
  const [roomName, setRoomName] = useState('');

  if(isAuth){
      
    if(gameMenu){
       componentToRender = <GameMenu  setOnline={setOnline} setOffline = {setOffline} resumeGame = {resumeGame} setResumeGame = {setResumeGame}/>
    }
    if(offline){
      console.log("Game state" , gameState);
      componentToRender = <OfflineTicTacToe userName={userName} resumeGame = {resumeGame} gameState = {gameState} 
      setIsAuth = {setIsAuth} setGameMenu = {setGameMenu} setInRoom = {setInRoom}/>
    }
    if(online){
      componentToRender = <JoinRoom setIsAuth={setIsAuth} userName={userName} socket = {socket} setInRoom={setInRoom} setRoomName = {setRoomName}/>
    }
    if(inRoom){
      componentToRender = <TicTacToe userName={userName} roomName = {roomName} socket = {socket}/>;
    }
  }else{
    componentToRender = <LoginSignup setIsAuth={setIsAuth} setUserName={setUserName} setGameMenu={setGameMenu} setResumeGame = {setResumeGame} setGameState = {setGameState}/>
  }
 


  return (
    <div>
      {componentToRender}
    </div>
  );
}

export default App;
