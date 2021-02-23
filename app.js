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

<<<<<<< HEAD
//get rout for the heart Rate
app.get("/hartrate", function(req, res){
    res.render("hartrate");
})

//get rout for the hartrate
app.get("/activelevel", function(req, res){
    res.render("activelevel")
})

//get rout for the hand motion
app.get("/handmotion", function(req, res){
    res.render("handmotion")
=======
//get route for the Heart Rate
app.get("/heartRate", function(req, res){
    res.render("heartRate");
})

//get route for the start
app.get("/start", function(req, res){
    res.render("/")
>>>>>>> 0980244d2511dcf704f07575d09d1b8da894e2f1
})

//app is listening to the port 3000 as server
app.listen(port, function(){
   console.log("[Server] - Server is running on :/localhost/3000"); 
})