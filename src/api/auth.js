import api from './init'

export function signIn({ email, password }) {
    return api.post(`/consumers/admin/${process.env.REACT_APP_API_KEY}/login`, {
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
    return api.post(`/consumers/admin/${process.env.REACT_APP_API_KEY}/register`, {
	"userData": {
		"email": email,
		"pwd": password
	}
})
  .then(res => res.data)
  .catch(error => {
    throw Error(error.response.data.error)})
}


// export function register({ email, password }) {
//     return api.post('/auth/register', {
//         email,
//         password
//     }).then(res => res.data)
// }
