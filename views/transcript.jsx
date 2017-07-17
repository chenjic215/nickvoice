import React from 'react';

export function Transcript(props) {

  // if (props.messages[0]) {
  //   if (props.messages[0].results[0].final) {
  //     console.warn("gainininininini ");
  //     props.addWatsonToHistory(props.messages[0].results[0].alternatives[0].transcript)
  //     //console.warn(props.messages[0].results[0].alternatives[0].transcript);
  //   }
  // }



  try {




    const results = props.messages.map(msg => {
      // When resultsBySpeaker is enabled, each msg.results array may contain multiple results.
      // The result_index is for the first result in the message, so we need to count up from there to calculate the key.
      return msg.results.map((result, i) => (
        <span key={`result-${msg.result_index + i}`}>{result.alternatives[0].transcript}</span>
      ));
    }).reduce((a, b) => a.concat(b), []); // the reduce() call flattens the array
    return (
      <div style={{color: '#000021'}}>
        (Watson) Live Capture : {results}
      </div>
    );
  } catch (ex) {
    console.log(ex);
    return <div>{ex.message}</div>;
  }
}
