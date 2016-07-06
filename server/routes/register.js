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


// updates from our profile
router.put('/', function (req, res, next) {
  Users.update(req.body, function (err, user) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }

    res.status(204).send(user);
  });
});

// Updates user data from community room actions
router.put('/:verCode', function (req, res) {
  Users.findOneAndUpdate({ verification: req.params.verCode }, req.body, function (err, user) {
    if (err) {
      console.log(req.body);
      res.sendStatus(500);
      return;
    }
    res.status(204).send(user);
  });
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

//gets all users and updates if they have been flagged
router.get('/:id', function (req, res) {
  console.log(req.params.id);
  Users.find({ verification : req.params.id }, function (err, user) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    console.log(user);
    res.send(user);
  });
});

// retrieve flagged users
router.get('/flagged/:ids', function (req, res) {
  console.log(req.params.ids);

  // re-form string of ids into an array and put in 'find' object
  var verCodeList = { verification: { $in: req.params.ids.split(',') } };
  Users.find(verCodeList, function (err, users) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    console.log(users);
    res.send(users);
  });
});

module.exports = router;
