import React, { useEffect, useState } from 'react';
import './GameMenu.css'; // Import the CSS file
function GameMenu({ setOnline, setOffline, resumeGame, setResumeGame, setIsAuth, setGameState }) {
  
  const handleResumeGame = () => {
     setOffline(true); 
  }

  const handleStartNewGame = () => {
    // Add logic to start a new game here
    setOffline(true);
    setResumeGame(false);
  }

  const handlePlayOnline = () => {
    // Add logic to play online here
    setOnline(true);
  }

  const handleLogOut = () =>{
      setIsAuth(false);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 className="GameMenuTitle">Game Menu</h1>
      {resumeGame && <button className="CndJbutton" onClick={handleResumeGame}>Resume Game</button>}
      <button className="CndJbutton" onClick={handleStartNewGame}>Start a New Game</button>
      <button className="CndJbutton" onClick={handlePlayOnline}>Play Online</button>
      <button className="logout-button" onClick={handleLogOut}>Logout</button>
    </div>
  );
}

export default GameMenu;
