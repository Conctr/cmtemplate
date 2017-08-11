import axios from 'axios'

const api = axios.create({
    baseURL: "https://api.staging.conctr.com/"//process.env.REACT_APP_API_URL
})

export function setApiToken(token) {
  if (!!token){
    api.defaults.headers['Authorization'] = `jwt:${token}`
  } else {
    delete api.defaults.headers['Authorization']
  }
}

export default api
