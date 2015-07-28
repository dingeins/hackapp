var express = require('express');
var binary = require('binary');
var https = require('https');
var router = express.Router();

router.post('/', function (req, res) {
  var data = new Buffer('', 'binary');
  req.on('data', function (chunk) {
    data = Buffer.concat([data, chunk]);
  });
  req.on('end', function () {
    var options = {
      host: 'api.projectoxford.ai',
      path: "/face/v0/detections?analyzesFaceLandmarks=true&analyzesAge=true&analyzesGender=true&analyzesHeadPose=false",
      method: 'POST',
      headers: { 'Content-Type': 'application/octet-stream', 'Ocp-Apim-Subscription-Key': 'dd8c434e62ec4a2fb0b7373c2a3ab9ad' }
    };

    // Send request to GitHub API
    var request = https.request(options, function (response) {
      var body = '';
      response.on("data", function (chunk) {
        body += chunk.toString('utf8');
      });

      response.on("end", function () {
        var faces = JSON.parse(body);
        res.send(JSON.stringify(faces));
      });
    });

    // End the request
    request.write(data);
    request.end();
  });
});

module.exports = router;
