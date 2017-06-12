/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const watson = require('watson-developer-cloud');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
// app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Bootstrap application settings
require('./config/express')(app);

const stt = new watson.SpeechToTextV1({
  // if left undefined, username and password to fall back to the SPEECH_TO_TEXT_USERNAME and
  // SPEECH_TO_TEXT_PASSWORD environment properties, and then to VCAP_SERVICES (on Bluemix)
  //username: '',
  //password: ''
});

const authService = new watson.AuthorizationV1(stt.getCredentials());
var PythonShell = require('python-shell');

app.get('/', function(req, res) {

  res.render('index', {
    BLUEMIX_ANALYTICS: process.env.BLUEMIX_ANALYTICS,
  });
});

app.get('/api/translation', function (req, res) {
    console.warn("File name received: "+req.headers.filename);
    //var tempPath = req.headers.preview;
    //var tempPath = URL.createObjectURL(req.headers.preview);

    //console.warn("File received: "+req.headers.files);

    var options = {
      // mode: 'text',
      // pythonPath: 'path/to/python',
      // pythonOptions: ['-u'],
      // scriptPath: 'path/to/my/scripts',
      args: [req.headers.filename]
      //args: [tempPath]
    };

    PythonShell.run('./cloud-client/quickstart.py',options, function (err, transcript) {
      if (err) throw err;
      var temp = transcript[1].slice(12)
      console.warn("Google Cloud: "+ temp);
      var google = temp;

      var options = {
        // mode: 'text',
        // pythonPath: 'path/to/python',
        // pythonOptions: ['-u'],
        // scriptPath: 'path/to/my/scripts',
        args: ["9fd2a189-3d57-4c02-8a55-5f0159bff2cf","e50b56df-95b7-4fa1-9061-83a7a9bea372",req.headers.filename]
        //args: ["9fd2a189-3d57-4c02-8a55-5f0159bff2cf","e50b56df-95b7-4fa1-9061-83a7a9bea372",tempPath]
      };

      //PythonShell.run('./examples/audio_client.py', options, function (err, transcript) {
      PythonShell.run('./pullstring-python/examples/audio_client.py', options, function (err, transcript) {
        if (err) throw err;
        console.warn("pullstring: "+ transcript[1]);
        var pullstring = transcript[1];

        var data = {
          google : google,
          pullstring: pullstring
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(data));
      });



    });
});

// Get token using your credentials
app.get('/api/token', function(req, res, next) {
  authService.getToken(function(err, token) {
    if (err) {
      next(err);
    } else {
      res.send(token);
    }
  });
});

module.exports = app;
