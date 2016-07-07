var express = require('express');
var router = express.Router();
var aws = require('aws-sdk');

// return credentials to client for request
router.get('/', function (req, res) {

  var returnData = {
    access_key: process.env.AWS_ACCESS_KEY_ID,
    secret_key: process.env.AWS_SECRET_ACCESS_KEY,
    bucket: process.env.S3_BUCKET_NAME
  };

  res.send(returnData);
});

module.exports = router;
