import api from './init'

const appId = '2bf8fdd3b3144deea63aa54402938d68'
let handleErrors
export function init(handleError) {
    handleErrors = handleError
}

export function signIn({ email, password }) {
    return api.post(`/consumers/admin/${appId}/login`, {
	"userData": {
		"email": email,
		"pwd": password
	}
})
  .then(res => res.data)
  .catch(error => {
    throw Error(error.response.data.error)})
}

export function register({ email, password }) {
    return api.post(`/consumers/admin/${appId}/register`, {
	"userData": {
		"email": email,
		"pwd": password
	}
})
  .then(res => res.data)
  .catch(error => {
    throw Error(error.response.data.error)})
}

export function authSignIn(email,provider,access_token) {
  api.defaults.headers['Authorization'] = `oth:${access_token}`
  return api.post(`/consumers/admin/${appId}/oauth/login`, {
  "userData": {
    "email": email
    },
  "provider": provider
  }
  )
  .then(res => res.data)
  .catch(error => {
    throw Error(error.response.data.error)})
  }

export function authRegister(email,provider,access_token) {
  api.defaults.headers['Authorization'] = `oth:${access_token}`
  return api.post(`/consumers/admin/${appId}/oauth/register`, {
  "userData": {
    "email": email
    },
  "provider": provider
  }
  )
  .then(res => res.data)
  .catch(error => {
    handleErrors(error.response.data.error)})
  }
// export function register({ email, password }) {
//     return api.post('/auth/register', {
//         email,
//         password
//     }).then(res => res.data)
// }
