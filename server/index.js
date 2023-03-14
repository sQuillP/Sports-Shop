const express = require("express");
const app = express();
const admin = require("./firebase/firebase.config");
const dbConnect = require("./db/dbConnect");



dbConnect();


app.listen(3000,()=> {
    console.log("Server listening on port 3000");
});

