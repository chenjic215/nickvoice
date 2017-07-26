import React from 'react';
import {Icon, Tabs, Pane, Alert} from 'watson-react-components';
import Tests from './tests'
import Demo from './demo.jsx'
import Charts from './charts'
import Radium from 'radium'
import RecordRTC from 'recordrtc';
import Logo from './Logo.jsx'
import { ResponsiveContainer} from 'recharts';


var recorder = null;
var mediaStream = null;

const styles = {
  blueberry: {
    display: 'block',
    position: 'absolute',
    width: 'auto',
    marginTop: '18px',
    right: '20px',
  },
}

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userLastRecorded_fileName : null,
      updated: false,
      recording: false
    };

    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.postFiles = this.postFiles.bind(this);
    this.xhr = this.xhr.bind(this);
    this.generateRandomString = this.generateRandomString.bind(this);
    this.captureUserMedia = this.captureUserMedia.bind(this);

  }

  startRecording() {

    this.captureUserMedia(function(stream) {
        mediaStream = stream;

        recorder = RecordRTC(stream, {
            type: 'audio',
            recorderType: RecordRTC.StereoAudioRecorder,
            desiredSampRate: 16 * 1000,
            numberOfAudioChannels: 1
        });

        this.setState({
          userLastRecorded_fileName : null,
          updated: false,
          recording: true
        });

        recorder.startRecording();

    }.bind(this));
  }

  stopRecording(callback) {

    recorder.stopRecording(this.postFiles);

    if (this.state.userLastRecorded_fileName && this.state.updated) {
      console.warn("hahah:"+ this.state.userLastRecorded_fileName);
      return callback(this.state.userLastRecorded_fileName);
    }

  }

  postFiles() {
    var blob = recorder.getBlob();

    var fileName = this.generateRandomString() + '.wav';

    var file = new File([blob], fileName, {
        type: 'audio/wav'
    });

    if(mediaStream) mediaStream.stop();


    return this.xhr('/uploadFile', file, function(responseText) {
        // var fileURL = JSON.parse(responseText).fileURL;
        // console.log('fileURL', fileURL);

        //pass to translation
        var fileName = JSON.parse(responseText).fileName;
        console.warn('fffileName: '+fileName);
        return fileName;
    });



  }

  // XHR2/FormData
  xhr(url, data, callback) {
      var request = new XMLHttpRequest();
      request.onreadystatechange = function() {
          if (request.readyState == 4 && request.status == 200) {
              this.setState({
                userLastRecorded_fileName: JSON.parse(request.responseText).fileName,
                updated: true,
                recording: false
              });
              callback(request.responseText);
          }
      }.bind(this);

      request.open('POST', url);

      var formData = new FormData();
      formData.append('file', data);
      request.send(formData);
  }

  // generating random string
  generateRandomString() {
      if (window.crypto) {
          var a = window.crypto.getRandomValues(new Uint32Array(3)),
              token = '';
          for (var i = 0, l = a.length; i < l; i++) token += a[i].toString(36);
          return token;
      } else {
          return (Math.random() * new Date().getTime()).toString(36).replace( /\./g , '');
      }
  }

  // reusable getUserMedia
  captureUserMedia(success_callback) {
      var session = {
          audio: true
      };

      navigator.getUserMedia(session, success_callback, function(error) {
          alert('Unable to capture your camera. Please check console logs.');
          console.error(error);
      });
  }

  render() {

    return (
      <div>
        <div style= {styles.blueberry}>
          <Logo/>
        </div>
        <Tabs selected={0}>

          <Pane label="Live Demo" className="special">
            <div style={{paddingTop: 40}}>
              <Demo startRecording={this.startRecording} stopRecording={this.stopRecording} userLastRecorded_fileName={this.state.userLastRecorded_fileName} updated={this.state.updated} recording={this.state.recording}/>
            </div>
          </Pane>

          <Pane label="Comparison of APIs">
            <div style={{paddingTop: 40}}>
              <Tests/>
            </div>
          </Pane>

          <Pane label="Charts">
            <div style={{paddingTop: 50}}>
                <ResponsiveContainer height='100%' width='100%'>
                    <Charts/>
                </ResponsiveContainer>
            </div>
          </Pane>

        </Tabs>
      </div>
    );
  }

};
export default Radium(Navigation)
