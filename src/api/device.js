import api from './init'

const REACT_APP_APP_ID = process.env.REACT_APP_APP_ID

export function getAll() {
  console.log('key',REACT_APP_APP_ID)
    return api.get(`/consumers/admin/${process.env.REACT_APP_APP_ID}/devices`)
  .then(res =>
    res.data)
  .catch(error => {
    throw Error(error.response.data.error)})
}
