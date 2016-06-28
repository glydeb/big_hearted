var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var Verifications = require('../models/verification');
var usedCodes = [];


// get existing verification codes
Verifications.find({}, function (err, codes) {
  if (err) {
    console.log('Error retrieving existing codes!');
  }

  codes.forEach(function (code, i) {
    usedCodes.push(code.verification);
  });
  console.log(usedCodes);
});

// Handles Ajax request for user information if user is authenticated
router.get('/', function (req, res) {
  console.log('get new verification code');

  // create verification code - 6 char
  var newCode = makeCode(6);

  // check against current codes - if duplicate, get different code
  while (usedCodes.indexOf(newCode) > 0) {newCode = makeCode(6);}

  // Once a unique code is found, add to array
  usedCodes.push(newCode);

  // store in verification code collection
  var verification = new Verifications({ verification: newCode, used: false });
  verification.save(function (err) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    // send new code back to client
    res.send(verification);
  });

});

function makeCode(len) {
  var text = [];
  var possible = 'abcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < len; i++) {
    text.push(possible.charAt(Math.floor(Math.random() * possible.length)));
  }

  return text.join().replace(/,/g, '');
}

module.exports = router;
