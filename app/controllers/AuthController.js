var User = require("../models/User");

function github(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ github: profile.id }, (err, user) => {
      return cb(err, user);
    });
}

function google(token, tokenSecret, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
    });
}

function googleCallback(req, res) {
    res.redirect('/');
}

function githubCallback(req, res) {
    res.redirect('/');
}

module.exports = {
  github: github,
  githubCallback: githubCallback,
  google: google,
  googleCallback: googleCallback
}