var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Post = require('../models/post');
var path = require('path');

// initialPosts is the number of posts to load initially to the
// community room view
var initialPosts = 25;

router.get('/', function(req, res) {
    Post.find({}).limit(initialPosts).exec(function(err, posts) {
        if (err) {
            res.sendStatus(500);
            return;
        }
        res.send(posts);
    });
});

// Send flagged posts to admin page on load/refresh
router.get('/flagged', function(req, res) {
    Post.find({
        flagged: true
    }, function(err, posts) {
        if (err) {
            res.sendStatus(500);
            return;
        }

        res.send(posts);
    });
});

// Get posts for a single user
router.get('/:verCode', function(req, res) {
    var verification = req.params.verCode;
    console.log('Verification: ', verification);
    Post.find({
        user_verify: verification
    }).limit(initialPosts).exec(function(err, posts) {
        if (err) {
            res.sendStatus(500);
            return;
        }
        res.send(posts);
    });
});


router.post('/', function(req, res) {
    var post = new Post(req.body);
    post.save(function(err) {
        if (err) {
            res.sendStatus(500);
            console.log(err);
            return;
        }

        res.sendStatus(201);
    });
});

router.delete('/:ids', function(req, res) {
    var idList = {
        _id: {
            $in: req.params.ids.split(',')
        }
    };
    Post.remove(idList, function(err) {
        if (err) {
            res.sendStatus(500);
            return;
        }

        res.sendStatus(204);
    });
});

router.put('/clear', function(req, res) {
    Post.update(req.body, {
        flagged: false
    }, {
        multi: true
    }, function(err, post) {
        if (err) {
            console.log(req.body);
            res.sendStatus(500);
            return;
        }

        res.status(204).send(post);
    });
});

router.put('/:id', function(req, res) {
    Post.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
        if (err) {
            console.log(req.body);
            res.sendStatus(500);
            return;
        }
        res.status(204).send(post);
    });
});


module.exports = router;
