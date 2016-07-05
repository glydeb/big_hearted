var express = require("express");
var router = express.Router();
var bodyParser = require('body-parser');
var Post = require('../models/post');
var User = require ('../models/user');
var path = require('path');

var options = {
  "limit": 3
};

router.get('/', function (req, res) {
  Post.find({}).limit(25).exec(function (err, posts) {
    if (err) {
      res.sendStatus(500);
      return;
    }
res.send(posts);
});
});
router.post('/', function (req, res) {
  var post = new Post(req.body);
    post.save(function (err) {
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
  User.findOneAndUpdate(req.params.verification, req.body, function (err, user) {
    if (err) {
      console.log(req.body);
      res.sendStatus(500);
      return;
    }
    res.status(204).send(user);
  })
});

router.put('/:id/:id', function (req, res) {
  Post.findOneAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) {
      console.log(req.body);
      res.sendStatus(500);
      return;
    }
    res.status(204).send(post);
  })
});


module.exports = router;
