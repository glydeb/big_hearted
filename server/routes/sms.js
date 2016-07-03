var express = require('express');
var router = express.Router();
var request = require('request');
var moment = require('moment');
var passport = require('passport');
var apiPromises = [];

// if process.env is not present, require in keys (local)
if (process.env.TWILIO_ACCOUNT_SID === undefined) {
  var keys = require('../keys');
  var accountSid = keys.twilio.sid;
  var authToken = keys.twilio.token;

// Otherwise, define settings off environment (Heroku)
} else {
  var accountSid = process.env.TWILIO_ACCOUNT_SID;
  var authToken = process.env.TWILIO_AUTH_TOKEN;
}

// create twilio client
var client = require('twilio')(accountSid, authToken);

// send single message, request from client
router.post('/', function (req, res) {

  //take request and put it into queue, call send function
  sendSMS(req.body);
  res.sendStatus(200);

});

// from heroku scheduler - bulk texts (dinnertime ideas, we miss you, etc.)

router.post('/scheduled', function (req, res) {

  // get current time
  // determine if any timezones get texts for current time
  // get members in selected timezone
  // test those members for receipt of various messages, create message objects
  // send messages
  // update member database based on sent texts
  res.sendStatus(200);
});

function sendSMS(queue) {
  console.log('sendSMS', queue);
  queue.forEach(function (options) {
    console.log('sending to: ', options.phone);
    client.messages.create(options, function (err, res) {
      if (err) {
        console.log('Send failed', err);
      } else {
        console.log('message sent to ' + options.phone);
      }
    });
  });
}

function createSMSString(alertIntro, newRec, existAlert, nickname) {
  var smsText = '';
  console.log('Enter createSMSString function');
  return smsText;
}

module.exports = router;
