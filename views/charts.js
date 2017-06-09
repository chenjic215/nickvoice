import React from 'react';
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar} from 'recharts';
import {StyleRoot} from 'radium';

const styles = {
  size: {
    fontSize: 12,
  },
}
const mixed = [
  {name: 'Watson', Kids: 49, Adults: 94},
  {name: 'Google', Kids: 97, Adults: 100},
  {name: 'Pullstring', Kids: 100, Adults: 100},
];


class Charts extends React.Component{
  constructor(props){
    super(props);

  }

  render() {

    return(
      <StyleRoot>
        <div style={{position: 'absolute', height: '80%', width: '100%'}}>
          <div style={{display: 'block', textAlign: 'center', height: '100%', width: '100%', 'paddingRight': '6%'}}>
            <div style={{display: 'inline-block', textAlign: 'center', height: '50%', width: '40%', minHeight: '500px', }}>
              <div style = {{paddingLeft: 80, fontFamily: 'Helvetica'}}>Accuracy for Adults</div>
              <ResponsiveContainer>
                <BarChart width={730} height={250} data={mixed}>
                  <XAxis dataKey="name" />
                  <YAxis label='%' width={90}/>
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Bar dataKey="Adults" fill="#000021" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{display: 'inline-block', height: '50%', width: '40%', minHeight: '500px', }}>
              <div style = {{paddingLeft: 80}}>Accuracy for Kids</div>
              <ResponsiveContainer>
                <BarChart width={730} height={250} data={mixed}>
                  <XAxis dataKey="name" padding={{ right: 10 }}/>
                  <YAxis label='%' width={90}/>
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Bar dataKey="Kids" fill="#4f32ff" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          </div>
      </StyleRoot>

    );
  }
}

export default Charts;
