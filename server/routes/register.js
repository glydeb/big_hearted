var express = require('express');
var router = express.Router();
var passport = require('passport');
var Users = require('../models/user');
var Verifications = require('../models/verification');
var path = require('path');

// Handles request for HTML file
router.get('/', function (req, res, next) {
  res.sendFile(path.resolve(__dirname, '../public/views/register.html'));
});

// Handles POST request with new user data
router.post('/', function (req, res, next) {
  Users.create(req.body, function (err, post) {
    if (err) {
      console.log('error on user creation', req.body);
      res.sendStatus(500);
    } else {

      // mark verification code as used
      // create update object
      var update = { verification: req.body.verification,
                     $set: { used: true } };
      console.log(update);

      // update database
      Verifications.update(update, function (err, code) {
        if (err) {
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
    }
  });
});


module.exports = router;
