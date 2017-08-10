import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios'
import { toast } from 'react-toastify'
import WebFont from 'webfontloader'

axios.interceptors.response.use(function (response) {
    console.log("asdfasdf");
    toast.alert('sdfgerhrf')
    return response;
  }, function (error) {
    console.log("asdfasdf");

    toast.error('kefgbkk')
    return error;
  });

WebFont.load({
  google: {
    families:['Quattrocento: 400', 'serif'] 
  }
})

require('dotenv').config()
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
