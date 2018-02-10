import api from "./init"
import { setToken } from "./init"
import { getDecodedToken } from "./token"

const appId = process.env.REACT_APP_CONCTR_APP_API_ID
let handleErrors
export function init(handleError) {
  handleErrors = handleError
}

export function signIn({ email, password }) {
  return api
    .post(`/consumers/admin/${appId}/login`, {
      userData: {
        email: email,
        pwd: password
      }
    })
    .then(res => res.data)
    .catch(error => {
      throw Error(error.response.data.error)
    })
}

export function register({ email, password }) {
  return api
    .post(`/consumers/admin/${appId}/register`, {
      userData: {
        email: email,
        pwd: password
      }
    })
    .then(res => res.data)
    .catch(error => {
      throw Error(error.response.data.error)
    })
}

export function authSignIn(email, provider, access_token) {
  return api
    .post(
      `/consumers/admin/${appId}/oauth/login`,
      {
        userData: {
          email: email
        },
        provider: provider
      },
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `oth:${access_token}`
        }
      }
    )
    .then(res => {
      const token = res.data.jwt
      setToken(token)
      return getDecodedToken()
    })
    .catch(error => {
      throw Error(error.response.data.error)
    })
}

export function authRegister(email, provider, access_token) {
  api.defaults.headers["Authorization"] = `oth:${access_token}`
  return api
    .post(
      `/consumers/admin/${appId}/oauth/register`,
      {
        userData: {
          email: email
        },
        provider: provider
      },
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `oth:${access_token}`
        }
      }
    )
    .then(res => {
      const token = res.data.jwt
      setToken(token)
      return getDecodedToken()
    })
    .catch(error => {
      handleErrors(error.response.data.error)
    })
}

export function signOutNow() {
  setToken(null)
}
