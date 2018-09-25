var express = require('express');
var router = express.Router();

var passport = require('../config/passport');

var AuthController = require('../controllers/AuthController');

router.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] })
);

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  AuthController.googleCallback
);

router.get('/auth/github',
  passport.authenticate('github')
);

router.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  AuthController.githubCallback
);

module.exports = router;
