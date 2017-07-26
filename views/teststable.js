import React from 'react';
import {Icon, Tabs, Pane, Alert} from 'watson-react-components';
import Data from './tablesdata.json'

export function TestsTable(props) {

  const a1 =[
    {
      id: 0,
      name: 'Andrew',
      actual: "What's the weather in New York today",
      watson: "What's the weather in New York today.",
      google: "what's the weather in New York today",
      pullstring: "what's the weather in new york today"
    },
    {
      id: 1,
      name: 'Gabe',
      actual: "What's the weather in New York like today",
      watson: "What's the weather in New York like today.",
      google: "what's the weather in New York like today",
      pullstring: "what's the weather in new york like today"
    },
    {
      id: 2,
      name: 'Jordan',
      actual: "What's the weather of New York today",
      watson: "What's the weather of New York K..",
      google: "what's the weather of New York today",
      pullstring: "what's the weather of new york today"
    },
    {
      id: 3,
      name: 'Josie',
      actual: "What's the weather in New York today",
      watson: "Blacks still Wednesday in New York today.",
      google: "what's the weather in New York today",
      pullstring: "what's the weather in new york today"
    }
  ];
  const a2 =[
    {
      id: 0,
      name: 'Andrew',
      actual: "What's one plus one.",
      watson: "What's one plus one.",
      google: "what's one plus one",
      pullstring: "what's one plus one"
    },
    {
      id: 1,
      name: 'Gabe',
      actual: "What's one plus one.",
      watson: "What's one plus one.",
      google: "what's one plus one",
      pullstring: "what's one plus one"
    },
    {
      id: 2,
      name: 'Jordan',
      actual: "What's one plus one.",
      watson: "Watch it while it lasts one.",
      google: "what's one plus one",
      pullstring: "what's one plus one"
    },
    {
      id: 3,
      name: 'Josie',
      actual: "What's one plus one.",
      watson: "What's one plus one.",
      google: "what's one plus one",
      pullstring: "what's one plus one"
    }
  ];
  const a3 =[
    {
      id: 0,
      name: 'Andrew',
      actual: "Set an alarm for 9 am",
      watson: "Set an alarm for 9:00 AM.",
      google: "set an alarm for 9 a.m.",
      pullstring: "set an alarm for nine AM"
    },
    {
      id: 1,
      name: 'Gabe',
      actual: "Set an alarm for 9 am",
      watson: "7 alarm for 9:00 AM.",
      google: "set an alarm for 9 a.m.",
      pullstring: "set an alarm for nine AM"
    },
    {
      id: 2,
      name: 'Jordan',
      actual: "Set a alarm from 9 am",
      watson: "That how a alarm.",
      google: "set alarm from 9 a.m.",
      pullstring: "set a alarm from nine AM"
    },
    {
      id: 3,
      name: 'Josie',
      actual: "Set an alarm at for 9 am",
      watson: "Sat in a liar 8489 me.",
      google: "set an alarm for 9 a.m.",
      pullstring: "set an alarm for nine AM"
    }
  ];

  const PersonRow = (props) => {

    return (
      <tr>
        <td>{ props.data.name }</td>
        <td>{ props.data.age }</td>
        <td></td>
        <td>{ props.data.watson }</td>
        <td>{ props.data.watson_score }</td>
        <td>{ props.data.google  }</td>
        <td>{ props.data.google_score }</td>
        <td>{ props.data.pullstring }</td>
        <td>{ props.data.pullstring_score }</td>
      </tr>
    );
  }

  try {
    let NonNativeTitles = (
      <tr style={{borderBottom: '2px solid #121212'}}>
        <td>NonNative</td>
        <td style={{width: 150}}>Age</td>
        <td></td>
        <td style={{width: 500}}>Watson         </td>
        <td>Score</td>
        <td style={{width: 500}}>Google         </td>
        <td>Score</td>
        <td style={{width: 500}}>PullString     </td>
        <td>Score</td>
      </tr>
    )
    let NativeTitles = (
      <tr style={{borderTop: '2px solid #121212', borderBottom: '2px solid #121212'}}>
        <td>Native</td>
        <td style={{width: 150}}>Age</td>
        <td></td>
        <td style={{width: 500}}>Watson         </td>
        <td>Score</td>
        <td style={{width: 500}}>Google         </td>
        <td>Score</td>
        <td style={{width: 500}}>PullString     </td>
        <td>Score</td>
      </tr>
    )

    let NativeRows1 = Data.map((item, key) => {
      if (item.audio == "1" && item.native == "native") {
          return <PersonRow key = {key} data = {item}/>
        }
    })
    let NonNativeRows1 = Data.map((item, key) => {
      if (item.audio == "1" && item.native == "nonnative") {
          return <PersonRow key = {key} data = {item}/>
        }
    })
    let NativeRows2 = Data.map((item, key) => {
      if (item.audio == "2" && item.native == "native") {
          return <PersonRow key = {key} data = {item}/>
        }
    })
    let NonNativeRows2 = Data.map(item => {
      if (item.audio == "2" && item.native == "nonnative") {
          return <PersonRow key = {item.id} data = {item}/>
        }
    })
    let NativeRows3 = Data.map(item => {
      if (item.audio == "3" && item.native == "native") {
          return <PersonRow key = {item.id} data = {item}/>
        }
    })
    let NonNativeRows3 = Data.map(item => {
      if (item.audio == "3" && item.native == "nonnative") {
          return <PersonRow key = {item.id} data = {item}/>
        }
    })


    return (
      <div>
        <Tabs selected={0}>

          <Pane label="Audio 1">
            <table style={{color: '#000021'}}><tbody>{NonNativeTitles}{NonNativeRows1}</tbody></table>
            <table style={{color: '#000021'}}><tbody>{NativeTitles}{NativeRows1}</tbody></table>
          </Pane>

          <Pane label="Audio 2">
            <table style={{color: '#000021'}}><tbody>{NonNativeTitles}{NonNativeRows2}</tbody></table>
            <table style={{color: '#000021'}}><tbody>{NativeTitles}{NativeRows2}</tbody></table>
          </Pane>

          <Pane label="Audio 3">
            <table style={{color: '#000021'}}><tbody>{NonNativeTitles}{NonNativeRows3}</tbody></table>
            <table style={{color: '#000021'}}><tbody>{NativeTitles}{NativeRows3}</tbody></table>
          </Pane>

        </Tabs>
      </div>
    )

  } catch (ex) {
    console.log(ex);
    return <div>{ex.message}</div>;
  }
}
