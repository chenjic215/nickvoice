import React from 'react';
import {Icon, Tabs, Pane, Alert} from 'watson-react-components';

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
        <td></td>
        <td>{ props.data.actual }</td>
        <td>{ props.data.watson }</td>
        <td>{ props.data.google  }</td>
        <td>{ props.data.pullstring }</td>
      </tr>
    );
  }

  try {
    let KidTitles = (
      <tr>
        <td style={{width: 200}}>Kids</td>
        <td></td>
        <td>Actual</td>
        <td>Watson</td>
        <td>Google</td>
        <td>PullString</td>
      </tr>
    )
    let AdultTitles = (
      <tr>
        <td style={{width: 200}}>Adults</td>
        <td></td>
        <td>Actual</td>
        <td>Watson</td>
        <td>Google</td>
        <td>PullString</td>
      </tr>
    )

    let KidRows1 = a1.map(item => {
      if (item.id > 1) {
          return <PersonRow key = {item.id} data = {item}/>
        }
    })
    let AdultRows1 = a1.map(item => {
      if (item.id < 2) {
          return <PersonRow key = {item.id} data = {item}/>
        }
    })
    let KidRows2 = a2.map(item => {
      if (item.id > 1) {
          return <PersonRow key = {item.id} data = {item}/>
        }
    })
    let AdultRows2 = a2.map(item => {
      if (item.id < 2) {
          return <PersonRow key = {item.id} data = {item}/>
        }
    })
    let KidRows3 = a3.map(item => {
      if (item.id > 1) {
          return <PersonRow key = {item.id} data = {item}/>
        }
    })
    let AdultRows3 = a3.map(item => {
      if (item.id < 2) {
          return <PersonRow key = {item.id} data = {item}/>
        }
    })


    return (
      <div>
        <Tabs selected={0}>

          <Pane label="Audio 1">
            <table><tbody>{KidTitles}{KidRows1}</tbody></table>
            <table><tbody>{AdultTitles}{AdultRows1}</tbody></table>
          </Pane>

          <Pane label="Audio 2">
            <table><tbody>{KidTitles}{KidRows2}</tbody></table>
            <table><tbody>{AdultTitles}{AdultRows2}</tbody></table>
          </Pane>

          <Pane label="Audio 3">
            <table><tbody>{KidTitles}{KidRows3}</tbody></table>
            <table><tbody>{AdultTitles}{AdultRows3}</tbody></table>
          </Pane>

        </Tabs>
      </div>
    )

  } catch (ex) {
    console.log(ex);
    return <div>{ex.message}</div>;
  }
}
