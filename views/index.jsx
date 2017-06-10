import React from 'react';
import Layout from './layout.jsx'
import Demo from './demo.jsx'
import Tests from './tests'
import Charts from './charts'
import Navigation from './navigationtabs'

export default function index(props) {
  return (<Layout bluemixAnalytics={props.BLUEMIX_ANALYTICS} ><Navigation/></Layout>); // eslint-disable-line
}
