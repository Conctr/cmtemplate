import axios from 'axios'
import { rememberToken, getValidToken } from './token'

const conctrKey = 'conctrToken'

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

export function setToken(token) {
  rememberToken(token, conctrKey)
  if (token) {
    axios.defaults.headers.common['Authorization'] = `jwt:${token}`
  }
  else {
    delete axios.defaults.headers.common['Authorization'] 
  }
}

setToken(getValidToken(conctrKey))

export default api
