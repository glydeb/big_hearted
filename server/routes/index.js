var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

// Handles login form POST from index.html
router.post('/', function(req, res, done) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return done(err); }
    if (user) {
      if (!user.active) {
        // user suspended
        console.log('index.js: User suspended');
        return res.send({ message: 'Your account has been suspended.' });
      } else {
        req.login(user, function(err) {
          if (err) { return done(err); }
          return res.redirect('/user');
        });
      }
    } else {
      return res.send({ message: 'Username/password combination not found.'})(req, res, done);
    }
  });
});

// Handle index file separately
// Also catches any other request not explicitly matched elsewhere
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/views/index.html'));
});

module.exports = router;
