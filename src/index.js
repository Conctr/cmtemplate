import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import WebFont from 'webfontloader'
import axios from 'axios'
import injectTapEventPlugin from 'react-tap-event-plugin'

WebFont.load({
  google: {
    families:['Quattrocento: 400', 'serif']
  }
})
injectTapEventPlugin()
let interceptSuccessful = () => {console.log('succes')}
let interceptError = () => {console.log('error')}
axios.interceptors.response.use(interceptSuccessful, interceptError);
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
