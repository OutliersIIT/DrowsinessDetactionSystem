//express required
const express = require ("express");

//use express module
const app = express();
const port = 3000;

//get route for the app
app.get("/", function(req, res){
    res.send("Sleep Tracker");
})

//app is listening to the port 3000 as server
app.listen(port, function(){
   console.log("[Server] - Server is running on :/localhost/3000"); 
})