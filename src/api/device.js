import api from './init'

const REACT_APP_APP_ID = '2bf8fdd3b3144deea63aa54402938d68' //process.env.REACT_APP_APP_ID


export function getAll() {
    return api.get(`/consumers/admin/${REACT_APP_APP_ID}/devices`)
  .then(res =>
    res.data)
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