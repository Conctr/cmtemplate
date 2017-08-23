import api from './init'
const request = require('request');

const REACT_APP_APP_ID = '2bf8fdd3b3144deea63aa54402938d68' //process.env.REACT_APP_APP_ID

let unloadToken;

export function loadFunctions(key,callback) {
  unloadToken = callback
}

export function getAll() {
    return api.get(`/consumers/admin/${REACT_APP_APP_ID}/devices`)
  .then(res =>
    res.data)
  .catch(error => {
    unloadToken()
    throw Error(error.response.data.error)})
}

//https://api.staging.conctr.com/consumers/admin/{app_id}/devices/{device_id}
export function getSingle(deviceId) {
  return api.get(`/consumers/admin/${REACT_APP_APP_ID}/devices/${deviceId}`)
  .then(res =>res.data.data)
    .catch(error => {
      throw Error(error.response.data.error)})
    }
export function getModel(deviceId) {
  return api.get(`/consumers/admin/${REACT_APP_APP_ID}/devices/${deviceId}/model`)
  .then(res =>
    res.data.data.events)
    .catch(error => {
      throw Error(error.response.data.error)})
    }


export function update(deviceId,conditions) {
  return api.patch(`/consumers/admin/${REACT_APP_APP_ID}/devices/${deviceId}`, conditions)
.then(res => res.data)
.catch(error => {
  throw Error(error.response.data.error)})
}

export function getAlertSettings(deviceId,conditions) {
  return new Promise((resolve, reject)=>{
     request.get(`https://agent.electricimp.com/Vi6qlyFcB9sI/config`,(err,res) => {
    resolve(JSON.parse(res.body,(key, value) =>
  typeof value === 'number'
    ? value.toString() // return value * 2 for numbers
    : value     // return everything else unchanged
).alerts);
  })
});
}

export function setAlertSettings(deviceId,conditions,cb) {


// Set the headers
var headers = {
  "Content-Type": "application/json"
}

// Configure the request
var options = {
    url: 'https://agent.electricimp.com/Vi6qlyFcB9sI/alerts',
    method: 'POST',
    headers: headers,
    body: JSON.stringify(conditions)
}

// Start the request
    request(options, function (error, response, body) {
       if (!error && response.statusCode === 200) {
           cb(error);
         }else{
           cb(null,body)
         }
  })
}
