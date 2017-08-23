import * as authApi from './auth'
var ourApi = 'AIzaSyDw5Ha6D5FMUT8cZ7uKpSFa2cfg-DllREM'
var yourWebClientId = '825347282342-4u6d1ntaiphdsn1uvmq2p81k9q99dpk8.apps.googleusercontent.com'
var GoogleAuth
var changeLoading
var signInOrRegister
var setConctrToken

export function start(setLoadingState,setToken) {
  setConctrToken = setToken
  changeLoading = setLoadingState
  window.gapi.load('client:auth2',initClient)
}

function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    let access_token = GoogleAuth.currentUser.get().Zi.access_token
    let email = GoogleAuth.currentUser.get().w3.U3
    if (signInOrRegister === 'signin'){
      authApi.authSignIn(email,'google',access_token)
      .then(data => {
        setConctrToken(data.jwt)
      })
      .catch(error => {
        throw Error(error)
      })
    } else if (signInOrRegister === 'register'){

    }
  }
}

function initClient(){
  changeLoading(true)
  window.gapi.client.init({
      'apiKey': ourApi,
      'clientId': yourWebClientId,
      'scope': 'profile',
      'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
  }).then(function () {
      GoogleAuth = window.gapi.auth2.getAuthInstance()
      changeLoading(false)
      GoogleAuth.isSignedIn.listen(updateSigninStatus)
  })
}

export function signIn(param){
  signInOrRegister = param
  GoogleAuth.signOut()
  GoogleAuth.signIn()
}
// 1. Load the JavaScript client library.
