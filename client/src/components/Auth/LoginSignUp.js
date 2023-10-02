import React, { useState } from 'react';
import './LoginSignUp.css';
import Cookies from 'js-cookie';
const LoginSignup = ({ setIsAuth, setUserName }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const token = Cookies.get("token");
  console.log(token);
  if(token){
    setIsAuth(true);
  }
  const handleLoginSignup = async () => {
    try {
      // Prepare data to send to the server for authentication
      const userData = { username, password };

      // Send a POST request to your server for authentication
      const method = isLogin ? 'login' : 'signup';
      const response = await fetch(`http://localhost:3001/api/users/${method}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const {status, message} = await response.json();
      
      console.log(status);
      
      if (response.ok) {
        // Authentication successful
        setIsAuth(true);
        setUserName(username)
        const {token} = await response.json()
        Cookies.set('token', token, { expires: 7 });
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
