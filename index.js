var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));

//Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://minigame:DmmxT2wjJZFoxxlU@cluster0.d7hev.mongodb.net/minigame?retryWrites=true&w=majority',
    {useNewUrlParser: true, useUnifiedTopology: true}, function (err){
        if(err){
            console.log("Mongo connected error "+ err);
        }else{
            console.log("Mongo connected successfully");
        }
});

// mini game
require("./controllers/game")(app);