// Modules
require('dotenv').config();
var bodyParser = require('body-parser');
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var flash = require('connect-flash');
var passport = require('./config/passportConfig.js')
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
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.alerts = req.flash();
  next();
});


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