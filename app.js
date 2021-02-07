//express required
const express = require ("express");
const ejs = require("ejs");

//use express module
const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
const port = 3000;

//get route for the app
app.get("/", function(req, res){
    res.render("home");
})

//get route for the about
app.get("/about", function(req, res){
    res.render("about");
})

//get route for the start
app.get("/start", function(req, res){
    res.render("/")
})

//app is listening to the port 3000 as server
app.listen(port, function(){
   console.log("[Server] - Server is running on :/localhost/3000"); 
})