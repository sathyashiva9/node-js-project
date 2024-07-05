const mongoose = require("mongoose");

const connectDB = async()=>{
    try{
        const conn = mongoose.connect(process.env.MONGO_URI);
        console.log("Connection success to the DB");
    } catch(err){
        console.log("DB conn unsuccessful",err);
    }
    
}

module.exports = connectDB;