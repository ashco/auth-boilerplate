var express = require('express');
var router = express.Router();

router.get('/login', function(req, res){
  res.render('auth/login.ejs');
});

router.post('/login', function(req, res){
  console.log('req.body is', req.body);
  res.send('login post route en route');
});

router.get('/signup', function(req, res){
  res.render('auth/signup');
});

router.post('/signup', function(req, res){
  console.log('req.body is', req.body);
  res.send('signup post route comming oneday someday');
});

router.get('/logout', function(req, res){
  res.send('logout route to come');
});

module.exports = router; 