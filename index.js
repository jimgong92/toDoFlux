/**
 * MODULE DEPENDENCIES
 */
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');

/**
 * Create Express Server
 */
var app = express(); 

/**
 * MongoDB connection
 */
mongoose.connect("mongodb://localhost/todo");
mongoose.connection.on("error", function(err) {
  console.error(err);
  console.error("MongoDB Connection Error.");
});

/**
 * Middleware
 */
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
  secret: "SECRET",
  resave: false,
  saveUninitialized: false
}));

/**
 * Express Server Configuration
 */
app.set("port", process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/client'));

app.listen(app.get("port"), function(){
  console.log("Listening on port %d", app.get("port"));
});