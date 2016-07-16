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
});

// authenticate verification code
router.get('/:candidate', function (req, res) {
  console.log('checking verification code');
  var candidate = req.params.candidate;

  Verifications.find({ used: false, verification: candidate },
    function (err, codes) {
      if (err) {
        console.log('Error retrieving verification code:', err);
        res.sendStatus(500);
        return;
      }

      if (codes.length > 0) {
        res.send({ result: true });
      } else {
        res.send({ result: false });
      }
    }
  );

});

// produce new verification code
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
