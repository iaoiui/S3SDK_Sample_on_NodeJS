var express = require('express');
var router = express.Router();

// Load the SDK and UUID
var AWS = require('aws-sdk');
var uuid = require('node-uuid');

// Create an S3 client
var s3 = new AWS.S3();

// Create a bucket and upload something into it
router.get('/putObject', function(req, res, next) {
  var bucketName = 'gorigori-' + uuid.v4();
  var keyName = 'gorigorigori.txt';
  s3.createBucket({Bucket: bucketName}, function() {
    var params = {Bucket: bucketName, Key: keyName, Body: 'Hello World!'};
    s3.putObject(params, function(err, data) {
      if (err)
        console.log(err)
      else
        console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
    });
  });
});

/* List Bucket */
router.get('/listBucket', function(req, res, next) {
  var params = {};
  s3.listBuckets(params, function(err, data) {
   if (err) console.log(err, err.stack); // an error occurred
   else  {   console.log(data);           // successful response
    res.send(data);
   }
  });
});

/* List Object */
router.get('/listObject', function(req, res, next) {
const bucketName = "hey-tono"
var params = { 
  Bucket: bucketName,
  Delimiter: '/'
 }
 s3.listObjects(params, function (err, data) {
  if(err)throw err;
  console.log(data.Contents);
  object = data;
  res.send(JSON.stringify(data.Contents));
 });
});


module.exports = router;
