import React, { useEffect, useState } from 'react';
import './LoginSignUp.css';
import Cookies from 'js-cookie';
const LoginSignup = ({ setIsAuth, setUserName, setGameMenu, setResumeGame, setGameState }) => {
  const [username, setUsername] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [password, setPassword] = useState('');
  const [instruction, setInstruction] = useState('')
      
  
  const handleLoginSignup = async () => {
    
    try {
      // Prepare data to send to the server for authentication
      const userData = { username, password, "previousState": false, "gameState": []};

      // Send a POST request to your server for authentication
      const method = isLogin ? 'login' : 'signup';
      setInstruction((isLogin ? "Logging" : "Signing " ) +" you in please wait...")
      const response = await fetch(`https://tic-tac-toe-server-eohu.onrender.com/api/users/${method}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const {status, message, user, token} = await response.json();
      
      if (response.ok) {
        // Authentication successful
        if(!isLogin){
          setIsAuth(true);
          setUserName(username)
          setGameMenu(true)
        }else{
          if(user.previousState){
            setGameState(user.gameState)
            setResumeGame(true);
          }
          setIsAuth(true);
          setUserName(username)
          setGameMenu(true)
        }

       
      } else {
        // Authentication failed
        console.log('Authentication failed');
       
        alert(message)
      }
     
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };

  return (
    <div className="LoginAndSignUp">
      <div className={`form ${isLogin ? 'login-form' : 'signup-form'}`}>
        <h2 className='title'>{isLogin ? 'Login' : 'Signup'}</h2>
        <h3 className='subtitle'> {instruction}</h3>
        <input
          type="text"
          placeholder="Username"
          className="input-box"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          className='input-box'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLoginSignup} className="action-button">
          {isLogin ? 'Login' : 'Signup'}
        </button>
      </div>
  
      <div className="toggle-form">
        <span onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Don\'t have an account? Sign up' : 'Already have an account? Log in'}
        </span>
      </div>
    </div>
  );
};

export default LoginSignup;
