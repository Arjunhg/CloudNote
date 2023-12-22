//Connecting to a basic mongoDB server
const mongoose = require('mongoose');
const mongoURI = 'mongodb://0.0.0.0:27017/iNotebook'

//making a function tp connect with database
const connectToMongo = async()=>{
    try{
        await mongoose.connect(mongoURI);
        console.log("Connected to Mongo");
    } catch(error){
        console.error("Error connection to mongo:", error.message);
    }
}

module.exports = connectToMongo;
