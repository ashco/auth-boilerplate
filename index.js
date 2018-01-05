// Modules
require('dotenv').config();
var bodyParser = require('body-parser');
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var flash = require('connect-flash');
var session = require('express-session');
var app = express();

// I do declare that middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
//Needs to be declared above passport and flash
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

// Routes
app.get('/', function(req, res){
  res.render('home.ejs');
});

app.get('/profile', function(req, res){
  res.render('profile.ejs');
});

app.use('/auth', require('./controllers/auth.js'))

// Listener
app.listen(process.env.PORT || 3000);