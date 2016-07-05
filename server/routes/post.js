var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Post = require('../models/post');
var path = require('path');

// initialPosts is the number of posts to load initially to the
// community room view
var initialPosts = 25;

router.get('/', function (req, res) {
  Post.find({}).limit(initialPosts).exec(function (err, posts) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    res.send(posts);
  });
});

// Send flagged posts to admin page on load/refresh
router.get('/flagged', function (req, res) {
  Post.find({ flagged: true }, function (err, posts) {
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

router.delete('/:id', function (req, res) {
  Post.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    res.sendStatus(204);
  });
});

router.put('/:id', function (req, res) {
  Post.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) {
      console.log(req.body);
      res.sendStatus(500);
      return;
    }
    res.status(204).send(post);
  })
});


module.exports = router;
