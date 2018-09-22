var express = require('express');
var router = express.Router();

var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;

var AuthController = require('../controllers/AuthController');

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.APP_URL + "/auth/github/callback"
  },
  AuthController.githubHandler
));

passport.use(new GoogleStrategy({
    consumerKey: process.env.GOOGLE_CONSUMER_KEY,
    consumerSecret: process.env.GOOGLE_CONSUMER_SECRET,
    callbackURL: process.env.APP_URL + "/auth/google/callback"
  },
  AuthController.googleHandler
));

router.get("/auth/github/callback", () => { return 0; } );
router.get("/auth/google/callback", () => { return 0; } );


module.exports = router;
