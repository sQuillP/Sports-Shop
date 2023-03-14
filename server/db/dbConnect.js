const mongoose = require("mongoose");


async function connectDB() {
    try{
        await mongoose.connect("mongodb://localhost:27017/Sports-Shop");
        console.log('successfully connected to mongoose db')
    } catch(error) {
        console.error("unable to connect to mongoose db");
    }
}


 module.exports = connectDB;