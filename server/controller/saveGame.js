const user = require('../models/user')
const bcrypt = require('bcryptjs')




exports.saveGame = async (req, res, next) =>{
    const username = req.body.username;

    const newGameState = req.body.gameState;

    const previousState = req.body.previousState;
    
    const newUser = await user.findOne({username})
    
    console.log(newUser);

     newUser.gameState = newGameState
     newUser.previousState = previousState;

     try {
        // Save the updated user data
        await newUser.save();
        console.log("saved to db");
        res.status(201).json({
            status: 'success',
            message: 'User updated successfully',
        });
    } catch (error) {
        // Handle any errors that occur during the update
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }

}

exports.getUser = async (req, res)=>{
   const {username} = req.body;
  
   try{
    const user = await user.findOne({username})
    res.status(201).json({
        user
    })
   }catch(error){
      res.status(401)
   }
}