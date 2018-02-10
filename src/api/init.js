import axios from 'axios'
import { rememberToken, getValidToken } from './token'

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

export function setToken(token) {
  rememberToken(token)
  if (token) {
    axios.defaults.headers.common['Authorization'] = `jwt:${token}`
  }
  else {
    delete axios.defaults.headers.common['Authorization'] 
  }
}

// export function setApiToken(token) {
//   if (!!token){
//     api.defaults.headers['Authorization'] = `jwt:${token}`
//   } else {
//     delete api.defaults.headers['Authorization']
//   }
// }

export default api
