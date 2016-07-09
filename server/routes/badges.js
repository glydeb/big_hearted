var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Badges = require('../models/badges');
var path = require('path');
//
// router.put('/badge1', function (req, res) {
//   User.update({ bibliophile: true }, function (err, post) {
//     if (err) {
//       console.log(req.body);
//       res.sendStatus(500);
//       return;
//     }





// router.get('/:id', function (req, res) {
//   console.log(req.params.id);
//   Badges.find({ verification : req.params.id }, function (err, badges) {
//     if (err) {
//       res.sendStatus(500);
//       return;
//     }
//     console.log(badges);
//     res.send(badges);
//   });
// });

// router.post('/:candidate', function (req, res) {
//   var badges = new Badges(req.body);
//   badges.save(function (err) {
//     if (err) {
//       res.sendStatus(500);
//       console.log(err);
//       return;
//     }
//
//     res.sendStatus(201);
//   });
// });


module.exports = router;
