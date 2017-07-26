import React from 'react'
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar} from 'recharts'
import {StyleRoot} from 'radium'
import data from './data.json'
import Radium from 'radium'
import { ButtonsGroup} from 'watson-react-components';

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
    this.state = {
        gender: ['male', 'female'],
        age: ['5-10', '10-18', '18-40', '40+'],
        native: ['native', 'nonnative'],
        audio: ['audio1', 'audio2', 'audio3'],


    }
    this.handleAudio = this.handleAudio.bind(this)
    this.handleAge = this.handleAge.bind(this)
    this.handleNative = this.handleNative.bind(this)
    this.handleGender = this.handleGender.bind(this)
  }


  handleAge(e) {
      const age = this.state.age.slice()
      if(this.state.age.includes(e.target.id)) {
          var index = age.indexOf(e.target.id)
          age.splice(index, 1)
      }
      else {
          age.push(e.target.id)
      }
      this.setState({
          age: age
      })
  }
  handleNative(e) {
      const native = this.state.native.slice()
      if(this.state.native.includes(e.target.id)) {
          var index = native.indexOf(e.target.id)
          native.splice(index, 1)
      }
      else {
          native.push(e.target.id)
      }
      this.setState({
          native: native
      })
  }
  handleGender(e) {
      const gender = this.state.gender.slice()
      if(this.state.gender.includes(e.target.id)) {
          var index = gender.indexOf(e.target.id)
          gender.splice(index, 1)
      }
      else {
          gender.push(e.target.id)
      }
      this.setState({
          gender: gender
      })
  }
  handleAudio(e) {
      const audio = this.state.audio.slice()
      if(this.state.audio.includes(e.target.id)) {
          var index = audio.indexOf(e.target.id)
          audio.splice(index, 1)
      }
      else {
          audio.push(e.target.id)
      }
      this.setState({
          audio: audio
      })
  }


  render() {
      let filteredArray = data.sample.filter(item => {
          if (
              this.state.gender.includes(item.gender) &&
              ((this.state.age.includes('5-') && item.age < 5) ||
              (this.state.age.includes('5-10') && item.age > 4 && item.age < 10) ||
              (this.state.age.includes('10-18') && item.age > 9 && item.age < 18) ||
              (this.state.age.includes('18-40') && item.age > 17 && item.age < 40) ||
              (this.state.age.includes('40+') && item.age > 39)) &&
              this.state.native.includes(item.native)
          ) {
              return item
          }
      })

      let googleAccuracy = filteredArray.reduce((sum, item) => {

          let currentItemSum = 0

          if (this.state.audio.includes('audio1')) {
              currentItemSum = item.audio1.google
          }
          if (this.state.audio.includes('audio2')) {
              currentItemSum = currentItemSum + item.audio2.google
          }
          if (this.state.audio.includes('audio3')) {
              currentItemSum = currentItemSum + item.audio3.google
          }
          return (sum + currentItemSum)
      }, 0) / (this.state.audio.length * filteredArray.length)

      let watsonAccuracy = filteredArray.reduce((sum, item) => {

          let currentItemSum = 0

          if (this.state.audio.includes('audio1')) {
              currentItemSum = item.audio1.watson
          }
          if (this.state.audio.includes('audio2')) {
              currentItemSum = currentItemSum + item.audio2.watson
          }
          if (this.state.audio.includes('audio3')) {
              currentItemSum = currentItemSum + item.audio3.watson
          }
          return (sum + currentItemSum)
      }, 0) / (this.state.audio.length * filteredArray.length)

      let pullstringAccuracy = filteredArray.reduce((sum, item) => {

          let currentItemSum = 0

          if (this.state.audio.includes('audio1')) {
              currentItemSum = item.audio1.pullstring
          }
          if (this.state.audio.includes('audio2')) {
              currentItemSum = currentItemSum + item.audio2.pullstring
          }
          if (this.state.audio.includes('audio3')) {
              currentItemSum = currentItemSum + item.audio3.pullstring
          }
          return (sum + currentItemSum)
      }, 0) / (this.state.audio.length * filteredArray.length)

      let chartsArray = [
          {name: 'Watson', Accuracy: ((watsonAccuracy*100).toFixed(2))*1},
          {name: 'Google', Accuracy: ((googleAccuracy*100).toFixed(2))*1},
          {name: 'Pullstring', Accuracy: ((pullstringAccuracy*100).toFixed(2))*1},
      ]
      let emptyArray = [
          {name: 'Watson', Accuracy: 0},
          {name: 'Google', Accuracy: 0},
          {name: 'Pullstring', Accuracy: 0}
      ]
      console.log(chartsArray)
    return(
      <StyleRoot>
        <div style={{position: 'absolute', height: '80%', width: '100%'}}>
          <div style={{display: 'block', textAlign: 'center', height: '100%', width: '100%', 'paddingRight': '6%'}}>
            <div style={{display: 'inline-block', height: '50%', width: '50%', minHeight: '500px', }}>
                    <div style = {{paddingLeft: 80}}>Voice Recognition Accuracy</div>
                    <ResponsiveContainer>
                    <BarChart width={730} height={250} data={watsonAccuracy ? chartsArray : emptyArray}>
                        <XAxis dataKey="name" padding={{ right: 10 }}/>
                        <YAxis label='%' width={90} domain={[40, 100]}/>
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Bar dataKey="Accuracy" fill="#000021" label={{fontSize: 20}}/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div style={{display: 'inline-block', textAlign: 'center', height: '50%', width: '20%', minHeight: '500px', marginLeft: '40px'}}>
                <div style = {{position: 'absolute', marginLeft: '10px', marginTop: 20, fontWeight: 'bold'}}>Filters:</div>
                <div style={{position: 'absolute', marginTop: '60px', marginLeft:'10px', width: 'inherit'}}>
                    <ButtonsGroup
                        type="checkbox"  // radio, button, or checkbox
                        name="radio-buttons"
                        onClick={e => this.handleGender(e)}
                        buttons={[{
                            value: 1,
                            id: 'male',
                            text: 'Male',
                            selected: this.state.gender.includes('male')
                        }, {
                            value: 2,
                            id: 'female',
                            text: 'Female',
                            selected: this.state.gender.includes('female')
                        }]}
                    />
                </div>
                <div style={{position: 'absolute', marginTop: '100px', marginLeft:'10px', width: 'inherit'}}>
                    <ButtonsGroup
                        type="checkbox"  // radio, button, or checkbox
                        name="radio-buttons"
                        onClick={e => this.handleNative(e)}
                        buttons={[{
                            value: 1,
                            id: 'native',
                            text: 'Native',
                            selected: this.state.native.includes('native')
                        }, {
                            value: 2,
                            id: 'nonnative',
                            text: 'Non Native',
                            selected: this.state.native.includes('nonnative')
                        }]}
                    />
                </div>
                <div style={{position: 'absolute', marginTop: '140px', marginLeft:'10px', width: 'inherit'}}>
                    <ButtonsGroup
                        type="checkbox"
                        name="radio-buttons"
                        onClick={e => this.handleAudio(e)}
                        buttons={[{
                            value: 1,
                            id: 'audio1',
                            text: 'Audio 1',
                            selected: this.state.audio.includes('audio1')
                        }, {
                            value: 2,
                            id: 'audio2',
                            text: 'Audio 2',
                            selected: this.state.audio.includes('audio2')
                        }, {
                            value: 3,
                            id: 'audio3',
                            text: 'Audio 3',
                            selected: this.state.audio.includes('audio3')
                        }]}
                    />
                </div>
                <div style={{position: 'absolute', marginTop: '180px', marginLeft:'10px', width: 'inherit'}}>
                    <ButtonsGroup
                        type="checkbox"
                        name="radio-buttons"
                        onClick={e => this.handleAge(e)}
                        buttons={[{
                            value: 2,
                            id: '5-10',
                            text: '5-10',
                            selected: this.state.age.includes('5-10')
                        }, {
                            value: 3,
                            id: '10-18',
                            text: '10-18',
                            selected: this.state.age.includes('10-18')
                        }, {
                            value: 4,
                            id: '18-40',
                            text: '18-40',
                            selected: this.state.age.includes('18-40')
                        }, {
                            value: 5,
                            id: '40+',
                            text: '40+',
                            selected: this.state.age.includes('40+')
                        }]}
                    />
                </div>

            </div>
          </div>
          </div>
      </StyleRoot>

    );
  }
}

export default Radium(Charts);
