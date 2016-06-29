var express = require("express");
var router = express.Router();
var bodyParser = require('body-parser');
var Ingredient = require('../models/ingredientschema');
var path = require('path');

router.get('/:id', function (req, res) {
  var ids = req.params.id;
  console.log(ids);
  Ingredient.find({user_id  : ids}, function (err, ingredients) {
    if (err) {
      res.sendStatus(500);
      return;
    }
res.send(ingredients);
});
});
router.post('/', function (req, res) {
  var ingredient = new Ingredient(req.body);
  ingredient.save(function (err) {
    if (err) {
      res.sendStatus(500);
      console.log(err);
      return;
    }

    res.sendStatus(201);
  });
});

router.delete('/:id', function(req, res) {
  Ingredient.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    res.sendStatus(204);
  });
});

router.put('/:id', function (req, res) {
  Ingredient.findByIdAndUpdate(req.params.id, req.body, function (err, ingredient) {
    if (err) {
      console.log(req.body);
      res.sendStatus(500);
      return;
    }
    res.status(204).send(ingredient);
  })
});

module.exports = router;
