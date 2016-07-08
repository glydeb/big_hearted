var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Badges = require('../models/badges');
var path = require('path');

router.get('/', function (req, res) {
  Badges.find({}, function (err, badges) {
    if (err) {
      res.sendStatus(500);

      return;
    }
    console.log("hey there")
res.send(badges);
});
});

router.get('/:id', function (req, res) {
  console.log(req.params.id);
  Badges.find({ verification : req.params.id }, function (err, badges) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    console.log(badges);
    res.send(badges);
  });
});

router.post('/', function (req, res) {
  var badges = new Badges(req.body);
  badges.save(function (err) {
    if (err) {
      res.sendStatus(500);
      console.log(err);
      return;
    }

    res.sendStatus(201);
  });
});


module.exports = router;
