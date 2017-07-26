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
var fs = require('fs');
var url = require('url');
var path = require('path');

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

var FILENAME = "";

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

function superFunction(a) {
  return FILENAME;
}

app.post('/uploadFile', function(request,response) {

  var uri = url.parse(request.url).pathname,
        filename = path.join(process.cwd(), uri);

  var isWin = !!process.platform.match(/^win/);

  if (filename && filename.toString().indexOf(isWin ? '\\uploadFile' : '/uploadFile') != -1 && request.method.toLowerCase() == 'post') {
        //var a = uploadFileFunction(request, response);


        //console.warn("name: "+ );
        //return uploadFileFunction(request, response);
        return superFunction(uploadFileFunction(request, response));
  }

  fs.exists(filename, function(exists) {
      if (!exists) {
          response.writeHead(404, {
              'Content-Type': 'text/plain'
          });
          response.write('404 Not Found: ' + filename + '\n');
          response.end();
          return;
      }

      if (filename.indexOf('favicon.ico') !== -1) {
          return;
      }

      if (fs.statSync(filename).isDirectory() && !isWin) {
          filename += '/index.html';
      } else if (fs.statSync(filename).isDirectory() && !!isWin) {
          filename += '\\index.html';
      }

      fs.readFile(filename, 'binary', function(err, file) {
          if (err) {
              response.writeHead(500, {
                  'Content-Type': 'text/plain'
              });
              response.write(err + '\n');
              response.end();
              return;
          }

          var contentType;

          if (filename.indexOf('.html') !== -1) {
              contentType = 'text/html';
          }

          if (filename.indexOf('.js') !== -1) {
              contentType = 'application/javascript';
          }

          if (contentType) {
              response.writeHead(200, {
                  'Content-Type': contentType
              });
          } else response.writeHead(200);

          response.write(file, 'binary');
          response.end();
      });
  });

})

function uploadFileFunction(request, response) {
  // parse a file upload
  var mime = require('mime');
  var formidable = require('formidable');
  var util = require('util');

  var form = new formidable.IncomingForm();

  var dir = !!process.platform.match(/^win/) ? '\\public\\audio\\' : '/public/audio/';

  form.uploadDir = __dirname + dir;
  form.keepExtensions = true;
  form.maxFieldsSize = 10 * 1024 * 1024;
  form.maxFields = 1000;
  form.multiples = false;

  return form.parse(request, function(err, fields, files) {
      var file = util.inspect(files);

      response.writeHead(200, getHeaders('Content-Type', 'application/json'));

      var fileName = file.split('path:')[1].split('\',')[0].split(dir)[1].toString().replace(/\\/g, '').replace(/\//g, '');

      FILENAME = fileName;

      var port = process.env.PORT || process.env.VCAP_APP_PORT || 3000;
      appAddress = process.env.IP || "0.0.0.0";
      if (appAddress == '0.0.0.0') {
          appAddress = 'localhost';
      }

      var fileURL = 'http://' + appAddress + ':' + port + '/public/audio/' + fileName;

      console.log('fileURL: ', fileURL);
      response.write(JSON.stringify({
          fileURL: fileURL,
          fileName: fileName
      }));
      response.end();
  });


}

function getHeaders(opt, val) {
    try {
        var headers = {};
        headers["Access-Control-Allow-Origin"] = "https://secure.seedocnow.com";
        headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
        headers["Access-Control-Allow-Credentials"] = true;
        headers["Access-Control-Max-Age"] = '86400'; // 24 hours
        headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";

        if (opt) {
            headers[opt] = val;
        }

        return headers;
    } catch (e) {
        return {};
    }
}


module.exports = app;
