import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import WebFont from 'webfontloader'
import axios from 'axios'

WebFont.load({
  google: {
    families:['Quattrocento: 400', 'serif']
  }
})
let interceptSuccessful = () => {// console.log('succes')}
}
let interceptError = () => {// console.log('error')
 }
require('dotenv').config()
axios.interceptors.response.use(interceptSuccessful, interceptError);
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
