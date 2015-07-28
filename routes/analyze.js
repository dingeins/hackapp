var express = require('express');
var binary = require('binary');
var https = require('https');
var router = express.Router();

router.post('/', function (req, res) {
  var binaryData = '';
  req.on('data', function (chunk) {
    binaryData = binaryData.concat(chunk);
  });
  req.on('end', function () {
    var buf = new Buffer(binaryData, 'binary');

    var options = {
      host: 'api.projectoxford.ai',
      path: "/face/v0/detections?analyzesFaceLandmarks=false&analyzesAge=true&analyzesGender=true&analyzesHeadPose=false",
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
        var first=0;
        var second=0;
        var min = 200;
        
        for (var i = 0; i < faces.length; i++) {
          var face1 = faces[i];
          for (var j = i+1; j < faces.length; j++) {
            var face2 = faces[j];
            var ageDiff = Math.abs(face1.attributes.age - face2.attributes.age)
            if(ageDiff < min){
              min = ageDiff;
              first = i;
              second = j;
            }
          }
        }
        
        var result = new Array(faces[first], faces[second]);
        res.send(JSON.stringify(result));
      });
    });

    // End the request
    request.write(buf);
    request.end();
  });
});

module.exports = router;
