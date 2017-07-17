import React from 'react';
import {Icon, Tabs, Pane, Alert} from 'watson-react-components';
import Tests from './tests'
import Demo from './demo.jsx'
import Charts from './charts'
import Radium from 'radium'
import Logo from './Logo.jsx'

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
  render() {
    return (
      <div>
        <div style= {styles.blueberry}>
          <Logo/>
        </div>
        <Tabs selected={0}>

          <Pane label="Live Demo" className="special">
            <div style={{paddingTop: 40}}>
              <Demo/>
            </div>
          </Pane>

          <Pane label="Comparison of APIs">
            <div style={{paddingTop: 40}}>
              <Tests/>
            </div>
          </Pane>

          <Pane label="Charts">
            <div style={{paddingTop: 50}}>
              <Charts/>
            </div>
          </Pane>

        </Tabs>
      </div>
    );
  }

};
export default Radium(Navigation)
