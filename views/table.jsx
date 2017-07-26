import React from 'react';

export function Table(props) {

    const data =[{
      id: 1,
      name: "Simon Bailey"
    }, {
      id: 2,
      name: "Thomas Burleson"
    }, {
      id: 3,
      name: "Will Button"
    }, {
      id: 4,
      name: "Ben Clinkinbeard"
    }, {
      id: 5,
      name: "Kent Dodds"
    }];


  const PersonRow = (props) => {
    return (
      <tr>
        <td>
          { props.data.id }
        </td>
        <td>
          { props.data.filename }
        </td>
        <td>
          { props.data.type }
        </td>
        <td>
          { props.data.watson}
        </td>
        <td>
          { props.data.google }
        </td>
        <td>
          { props.data.pullstring}
        </td>

        <td><form><input type="text" name="hi"/></form></td>
      </tr>
    );
  }

  try {
    let title = (
      <tr>
        <td>
          id
        </td>
        <td>
          File Name
        </td>
        <td>
          Type
        </td>
        <td>
          Watson
        </td>
        <td>
          Google
        </td>
        <td>
          PullString
        </td>
        <td>What does the audio clip actually say?</td>
      </tr>
    )
    let rows = props.history.map(item => {
      // if (item.google && item.pullstring && item.watson) {
        return <PersonRow key = {item.id} data = {item}/>
      // }

    })

    return <table > < tbody > {title} {rows} < /tbody> < /table>

  } catch (ex) {
    console.log(ex);
    return <div>{ex.message}</div>;
  }
}
