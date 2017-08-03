import api from './init'

export function signIn({ email, password }) {
    return api.post('/consumers/admin/2bf8fdd3b3144deea63aa54402938d68/login', {
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
    return api.post('/consumers/admin/2bf8fdd3b3144deea63aa54402938d68/register', {
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
