import * as authApi from './auth'
const ourApi = 'ZMjBBGIr8SPnj_IiWlT2awdae' 
const yourWebClientId = '623084099025-ru09r0q5rhjguaj4n348umdjcllr3hrp.apps.googleusercontent.com'
let GoogleAuth
let changeLoading
let signInOrRegister
let setConctrToken
let handleErrors
let userDetails = {}


export function start(setLoadingState,setToken,handleError) {
  setConctrToken = setToken
  changeLoading = setLoadingState
  handleErrors = handleError
  window.gapi.load('client:auth2',initClient)
}

export function getUserDetails() {
  return userDetails
}

function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    let access_token = GoogleAuth.currentUser.get().Zi.access_token
    let email = GoogleAuth.currentUser.get().w3.U3

    userDetails.firstname =  GoogleAuth.currentUser.get().w3.ofa
    userDetails.lastname = GoogleAuth.currentUser.get().w3.wea
    userDetails.avatar = GoogleAuth.currentUser.get().w3.Paa
    if (signInOrRegister === 'signin'){
      authApi.authSignIn(email,'google',access_token)
      .then(data => {
        setConctrToken(data.jwt)
      })
      .catch(error => {
        throw Error(error)
      })
    } else if (signInOrRegister === 'register'){
      authApi.authRegister(email,'google',access_token)
      .then(data => {
        setConctrToken(data.jwt)
      })
      .catch(error => {
        handleErrors(error)
      })
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
