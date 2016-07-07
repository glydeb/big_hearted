var express = require('express');
var router = express.Router();
var aws = require('aws-sdk');

// return credentials to client for request
router.get('/', function (req, res) {
  var s3 = new aws.S3();
  var fileName = req.query['file-name'];
  var fileType = req.query['file-type'];
  var s3Params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.log(err);
      return res.end();
    }

    var returnData = {
      signedRequest: data,
      url: 'https://' + process.env.S3_BUCKET_NAME + '.s3.amazonaws.com/' + fileName,
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
});

module.exports = router;
