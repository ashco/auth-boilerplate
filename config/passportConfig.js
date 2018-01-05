var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var db = require('../models');

passport.serializeUser(function(user, callback){
  callback(null, user.id);
});

passport.deserializeUser(function(id, callback){
  db.user.findById(id).then(function(user){
    callback(null, user);
  }).catch(function(err){
    callback(err, null);
  });
});

passport.use(new localStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(email, password, callback){
  db.user.findOne({
    where: { email: email }    
  }).then(function(user){
    if(!user || !user.isValidPassword(password)){
      callback(null, false);
    }
    else{
      callback(null, user);
    }
  }).catch(function(err){
    callback(err, null);
  });
}));

module.exports = passport;