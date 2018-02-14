import api from "./init"
const request = require("request")

const appId = process.env.REACT_APP_CONCTR_APP_API_ID

export function getAll() {
  return api
    .get(`/consumers/admin/${appId}/devices`)
    .then(res => res.data)
    .catch(error => {
      throw Error(error.response.data.error)
    })
}

export function getSingle(deviceId) {
  return api
    .get(`/consumers/admin/${appId}/devices/${deviceId}`)
    .then(res => res.data.data)
    .catch(error => {
      throw Error(error.response.data.error)
    })
}
export function getModel(deviceId) {
  return api
    .get(`/consumers/admin/${appId}/devices/${deviceId}/model`)
    .then(res => res.data.data.events)
    .catch(error => {
      throw Error(error.response.data.error)
    })
}

export function update(deviceId, conditions) {
  return api
    .patch(`/consumers/admin/${appId}/devices/${deviceId}`, conditions)
    .then(res => res.data)
    .catch(error => {
      throw Error(error.response.data.error)
    })
}

export function getAlertSettings(deviceId, conditions) {
  return new Promise((resolve, reject) => {
    request.get(
      `https://agent.electricimp.com/Vi6qlyFcB9sI/config`,
      (err, res) => {
        resolve(
          JSON.parse(
            res.body,
            (key, value) =>
              typeof value === "number"
                ? value.toString() // return value * 2 for numbers
                : value // return everything else unchanged
          ).alerts
        )
      }
    )
  })
}

export function setAlertSettings(deviceId, conditions, cb) {
  // Set the headers
  var headers = {
    "Content-Type": "application/json"
  }

  // Configure the request
  var options = {
    url: "https://agent.electricimp.com/Vi6qlyFcB9sI/alerts",
    method: "POST",
    headers: headers,
    body: JSON.stringify(conditions)
  }

  // Start the request
  request(options, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      cb(error)
    } else {
      cb(null, body)
    }
  })
}
