var express = require("express");
var router = express.Router();
var bodyParser = require('body-parser');
var Download = require('../models/downloads');
var Organization = require('../models/organizations')
var path = require('path');

router.get('/', function (req, res) {
  Download.find({}, function (err, downloads) {
    if (err) {
      res.sendStatus(500);
      return;
    }
res.send(downloads);
});
});

router.get('/organization', function (req, res) {
  Organization.find({}, function (err, organization) {
    if (err) {
      res.sendStatus(500);
      return;
    }
res.send(organization);
});
});

router.put('/organization/:id', function (req, res) {
  Organization.findByIdAndUpdate(req.params.id, req.body, function (err, organization) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    res.status(204).send(organization);
  });
});

router.put('/download/:id', function (req, res) {
  Download.findByIdAndUpdate(req.params.id, req.body, function (err, download) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    res.status(204).send(download);
  });
});
// router.post('/', function (req, res) {
//   var ingredient = new Ingredient(req.body);
//   ingredient.save(function (err) {
//     if (err) {
//       res.sendStatus(500);
//       console.log(err);
//       return;
//     }
//
//     res.sendStatus(201);
//   });
// });
//
// router.delete('/:id', function(req, res) {
//   Ingredient.findByIdAndRemove(req.params.id, function (err) {
//     if (err) {
//       res.sendStatus(500);
//       return;
//     }
//     res.sendStatus(204);
//   });
// });
//
// router.put('/:id', function (req, res) {
//   Ingredient.findByIdAndUpdate(req.params.id, req.body, function (err, ingredient) {
//     if (err) {
//       console.log(req.body);
//       res.sendStatus(500);
//       return;
//     }
//     res.status(204).send(ingredient);
//   })
// });

module.exports = router;
