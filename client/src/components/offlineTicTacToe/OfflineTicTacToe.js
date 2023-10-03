import React, { useState, useRef, useEffect } from 'react'
import './OfflineTicTacToe.css'
import circle from '../assests/circle.png'
import cross from '../assests/cross.png'
import axios from 'axios'
import Cookies from 'js-cookie'
let data = ["", "", "", "", "", "", "", "", "" ]


const OfflineTicTacToe = ({userName, resumeGame, gameState, setIsAuth, setGameMenu, setInRoom}) =>{
    let [count, setCount] = useState(0);
    let [lock, setLock]  = useState(false)
   // const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);
   const initialData = ["", "", "", "", "", "", "", "", ""];
   const [gameStateData, setGameStateData] = useState(initialData);
    let titleRef = useRef(null)
    let box1 = useRef(null);
    let box3 = useRef(null);
    let box2 = useRef(null);
    let box4 = useRef(null);
    let box5 = useRef(null);
    let box6 = useRef(null);
    let box7 = useRef(null);
    let box8 = useRef(null);
    let box9 = useRef(null); 
    let box_array = [box1, box2, box3, box4, box5, box6, box7, box8, box9]

    useEffect(() => {
        if (resumeGame) {
          setGameStateData(gameState);
        }
      }, [resumeGame, gameState]);
    
    const toggle = (e, num) =>{
       if(lock){
        return 0;
       }
       if(count%2 === 0){
        e.target.innerHTML = `<img src = '${cross}' ></img> `;
        data[num] = "x";
        setCount(++count);
       }else{
        e.target.innerHTML = `<img src = '${circle}' ></img> `;
        data[num] = "o";
        setCount(++count);
       }

       checkWin();

    }

    const checkWin = () =>{
        if(data[0] === data[1] && data[1] === data[2] && data[2] !== ""){
              
            won(data[2]);
        
            }else if(data[3] === data[4] && data[4] === data[5] && data[5] !== ""){
            won(data[5])
        }else if(data[6] === data[7] && data[7] === data[8] && data[8] !== ""){
            won(data[8])
        }else if(data[0] === data[3] && data[3] === data[6] && data[6] !== ""){
            won(data[6])
        }else if(data[1] === data[4] && data[4] === data[7] && data[7] !== ""){
            won(data[7])
        }else if(data[2] === data[5] && data[5] === data[8] && data[8] !== ""){
            won(data[8])
        }else if(data[0] === data[4] && data[4] === data[8] && data[8] !== ""){
            won(data[8])
        }else if(data[0] === data[1] && data[1] === data[2] && data[2] !== ""){
            won(data[2])
        }else if(data[2] === data[4] && data[4] === data[6] && data[6] !== ""){
            won(data[6])
        }
    }

    const won = (winner) =>{
        setLock(true);
        if(winner ==="x"){
            titleRef.current.innerHTML = `Congratulations: <img src=${cross} wins>`
        }else{
            titleRef.current.innerHTML = `Congratulations: <img src=${circle} wins>`
        }
    }

    const reset = async() =>{
        setLock(false);
        data = ["", "", "", "", "", "", "", "", "", ""];
        titleRef.current.innerHTML = 'Tic Tac Toe'
        box_array.map( (e)=>{
            e.current.innerHTML = ""
        } )
        const request = {
            "username" : userName,
            gameState : data,
            previousState: false
        }
        try {
            const response = await axios.post('http://localhost:3001/api/game/saveGame', request);
            // Handle the response from the server here
            console.log(response.data); // Assuming the server returns JSON data
        } catch (error) {
            // Handle any errors that occur during the request
            console.error(error);
        }
    }

    const saveGame = async () =>{
        const request = {
            "username" : userName,
            gameState : data,
            previousState: true
        }
        try {
            const response = await axios.post('http://localhost:3001/api/game/saveGame', request);
            // Handle the response from the server here
            console.log(response.data); // Assuming the server returns JSON data
        } catch (error) {
            // Handle any errors that occur during the request
            console.error(error);
        }
    }

    const handleLogOut = () => {
        Cookies.set('token', '')
        setIsAuth(false);
        setInRoom(false);
        setGameMenu(false);
     }

    return (
        <div className = 'container'>
           
           <h1 className = "title" ref={titleRef}>Tic Tac Toe Game In <span>React</span></h1>
           <h4 className='userName' >Player: {userName}</h4> {/* Display the userName here */}
           <div>
             
           </div>
           <div className = "board">
               <div className = "row1">
                  <div className = "boxes" ref = {box1} onClick={(e)=>{toggle(e, 0)}} >{ gameStateData[0] === "x" ? <img src={cross} alt="cross" /> : gameStateData[0] === "o" ? <img src={circle} alt="circle" /> : "" }</div>
                  <div className = "boxes" ref = {box2} onClick={(e)=>{toggle(e, 1)}} >{ gameStateData[1] === "x" ? <img src={cross} alt="cross" /> : gameStateData[1] === "o" ? <img src={circle} alt="circle" /> : "" }</div>
                  <div className = "boxes" ref = {box3} onClick={(e)=>{toggle(e, 2)}} >{ gameStateData[2] === "x" ? <img src={cross} alt="cross" /> : gameStateData[2] === "o" ? <img src={circle} alt="circle" /> : "" }</div>
               </div>
               <div className = "row2">
                  <div className = "boxes" ref = {box4} onClick={(e)=>{toggle(e, 3)}} >{ gameStateData[3] === "x" ? <img src={cross} alt="cross" /> : gameStateData[3] === "o" ? <img src={circle} alt="circle" /> : "" }</div>
                  <div className = "boxes" ref = {box5} onClick={(e)=>{toggle(e, 4)}} >{ gameStateData[4] === "x" ? <img src={cross} alt="cross" /> : gameStateData[4] === "o" ? <img src={circle} alt="circle" /> : "" }</div>
                  <div className = "boxes" ref = {box6} onClick={(e)=>{toggle(e, 5)}} >{ gameStateData[5] === "x" ? <img src={cross} alt="cross" /> : gameStateData[5] === "o" ? <img src={circle} alt="circle" /> : "" }</div>
               </div>
               <div className = "row3">
                  <div className = "boxes" ref = {box7} onClick={(e)=>{toggle(e, 6)}} >{ gameStateData[6] === "x" ? <img src={cross} alt="cross" /> : gameStateData[6] === "o" ? <img src={circle} alt="circle" /> : "" }</div>
                  <div className = "boxes" ref = {box8} onClick={(e)=>{toggle(e, 7)}} >{ gameStateData[7] === "x" ? <img src={cross} alt="cross" /> : gameStateData[7] === "o" ? <img src={circle} alt="circle" /> : "" }</div>
                  <div className = "boxes" ref = {box9} onClick={(e)=>{toggle(e, 8)}} >{ gameStateData[8] === "x" ? <img src={cross} alt="cross" /> : gameStateData[8] === "o" ? <img src={circle} alt="circle" /> : "" }</div>
               </div>
           </div>
           <button className="reset" onClick={saveGame} style={{ marginRight: '10px' }}>
          Save Game
        </button>
           <button className = "reset" onClick={ ()=>{reset()} }>Reset</button>
           <button className="logout-button"onClick={handleLogOut}>Logout</button>
        </div>
    )
}

export default OfflineTicTacToe