import api from './init'

export function getAll() {
    return api.get('/consumers/admin/2bf8fdd3b3144deea63aa54402938d68/devices')
  .then(res =>
    res.data)
  .catch(error => {
    throw Error(error.response.data.error)})
}
