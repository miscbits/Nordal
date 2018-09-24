var express = require('express');
var router = express.Router();

var passport = require('../config/passport');

var AuthController = require('../controllers/AuthController');

app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] })
);

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  AuthController.googleCallback
);

app.get('/auth/github',
  passport.authenticate('github')
);

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  AuthController.githubCallback
);

module.exports = router;
