import React, { useState, useRef, useEffect } from 'react'
import './TicTacToe.css'
import circle from '../assests/circle.png'
import cross from '../assests/cross.png'
import axios from 'axios'
let data = ["", "", "", "", "", "", "", "", "" ]

const TicTacToe = ({userName, roomName, socket ,setOnline, setInRoom}) =>{
    let [count, setCount] = useState(0);
    let [lock, setLock]  = useState(false)
    let titleRef = useRef(null)
    let box1 = useRef(null);
    let box2 = useRef(null);
    let box3 = useRef(null);
    let box4 = useRef(null);
    let box5 = useRef(null);
    let box6 = useRef(null);
    let box7 = useRef(null);
    let box8 = useRef(null);
    let box9 = useRef(null); 
    let box_array = [box1, box2, box3, box4, box5, box6, box7, box8, box9]
    
    useEffect( () =>{
         socket.on("play_again", () =>{
            data = ["", "", "", "", "", "", "", "", "", ""];
            box_array.map( (e)=>{
            e.current.innerHTML = ""
           })
         })

         socket.on("winner", (payLoad) =>{
             won(payLoad.winner);
         })
    })

    useEffect( () =>{
          socket.on("receive_message", (payLoad) =>{
            data  = payLoad.data;
            for(let i = 0 ;i<box_array.length; i++){
                if(box_array[i].current === null){
                    box_array[i].current = ""
                }
                if (data[i] === 'x') {
                    box_array[i].current.innerHTML = `<img src='${cross}'></img>`;
                  } else if (data[i] === 'o') {
                    box_array[i].current.innerHTML = `<img src='${circle}'></img>`;
                  }else {
                  box_array[i].current.innerHTML = ""; // Clear the box if data is empty
                }
            }
           
            setLock(false);
            setCount(payLoad.whooseChance)
            /*
             console.log("Got data back");
             setLock(false);
             const dataArray = payLoad.data;
             console.log(dataArray);
             setData(dataArray);
             setCount(payLoad.whooseChance)
             for (let i = 0; i < dataArray.length; i++) {
                if (dataArray[i] === 'x') {
                  box_array[i].current.innerHTML = `<img src='${cross}'></img>`;
                } else if (dataArray[i] === 'o') {
                  box_array[i].current.innerHTML = `<img src='${circle}'></img>`;
                } else {
                  box_array[i].current.innerHTML = ""; // Clear the box if data is empty
                }
              }
              */
          })
          
    }, [socket])
    


    const toggle = (e, num) =>{
       if(lock){
        return 0;
       }

       if(count%2 === 0){
        e.target.innerHTML = `<img src = '${cross}' ></img> `;
        data[num] = "x";
        setCount(++count);
        console.log("boxArray "+ box_array);
        socket.emit("send_data", {roomName, data, "whooseChance": count})
        checkWin()
        setLock(true);
       }else{
        e.target.innerHTML = `<img src = '${circle}' ></img> `;
        data[num] = "o";
        setCount(++count);
        socket.emit("send_data", {roomName, data, "whooseChance": count})
        setLock(true);
        checkWin()
       }

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

    const won = async(winner) =>{
        socket.emit("won", {roomName, "winner": winner, "username" : userName})
        //Update Winnings of the user
        const payLoad = {
            "username" : userName
        }
        try{
            await axios.post("https://tic-tac-toe-server-eohu.onrender.com/api/game/updateWin", payLoad) 
        }catch(error){
            console.log(error);
        }
        

        setLock(true);
        if(winner ==="x"){
            titleRef.current.innerHTML = `Congratulations: <img src=${cross} wins>`
        }else{
            titleRef.current.innerHTML = `Congratulations: <img src=${circle} wins>`
        }
    }

    const reset = () =>{
        setLock(false);
        data = ["", "", "", "", "", "", "", "", "", ""];
        titleRef.current.innerHTML = 'Tic Tac Toe'
        box_array.map( (e)=>{
            e.current.innerHTML = ""
        })
        socket.emit('updateGame', data);
    }

    const handleMenu = () =>{
        setInRoom(false);
        setOnline(false);
    }

    return (
        <div className = 'container'>
           <h1 className = "title" ref={titleRef}>Tic Tac Toe Game In <span>React</span></h1>
           <h4 className='userName'>Player: {userName}</h4>
           <div className = "board">
               <div className = "row1">
                  <div className = "boxes" ref = {box1} onClick={(e)=>{toggle(e, 0)}} >  </div>
                  <div className = "boxes" ref = {box2} onClick={(e)=>{toggle(e, 1)}} >  </div>
                  <div className = "boxes" ref = {box3} onClick={(e)=>{toggle(e, 2)}} >  </div>
               </div>
               <div className = "row2">
                  <div className = "boxes" ref = {box4} onClick={(e)=>{toggle(e, 3)}} >  </div>
                  <div className = "boxes" ref = {box5} onClick={(e)=>{toggle(e, 4)}} >  </div>
                  <div className = "boxes" ref = {box6} onClick={(e)=>{toggle(e, 5)}} >  </div>
               </div>
               <div className = "row3">
                  <div className = "boxes" ref = {box7} onClick={(e)=>{toggle(e, 6)}} >  </div>
                  <div className = "boxes" ref = {box8} onClick={(e)=>{toggle(e, 7)}} >  </div>
                  <div className = "boxes" ref = {box9} onClick={(e)=>{toggle(e, 8)}} >  </div>
               </div>
           </div>
           <button className="logout-button"onClick={handleMenu}>Exit Room</button>
        </div>
    )
}

export default TicTacToe