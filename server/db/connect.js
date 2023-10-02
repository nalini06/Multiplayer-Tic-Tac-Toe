const mongoose = require('mongoose')
//const connectString = "mongodb+srv://nalini:spiderman@nodeexpressproject.zucgh7d.mongodb.net/TASK-MANAGER?retryWrites=true&w=majority"


const connectDB = (url) =>{
    return mongoose
    .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology:true
    })
}
module.exports = connectDB