var User = require("../models/User");

function githubHandler(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ github: profile.id }, (err, user) => {
      return cb(err, user);
    });
}

function(token, tokenSecret, profile, cb) {
  User.findOrCreate({ google: profile.id }, (err, user) => {
    return cb(err, user);
  });
}
