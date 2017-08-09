var ourApi = 'AIzaSyDw5Ha6D5FMUT8cZ7uKpSFa2cfg-DllREM'
var yourWebClientId = '825347282342-4u6d1ntaiphdsn1uvmq2p81k9q99dpk8.apps.googleusercontent.com'
var GoogleAuth;
var isAuthorized;
var changeLoggedIn;
export function start(setLoginState) {
  changeLoggedIn = setLoginState;
  window.gapi.load('client:auth2',initClient)
}

function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    isAuthorized = true;
  } else {
    isAuthorized = false;
  }
}

function initClient(){
  window.gapi.client.init({
      'apiKey': ourApi,
      'clientId': yourWebClientId,
      'scope': 'profile',
      'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
  }).then(function () {
      GoogleAuth = window.gapi.auth2.getAuthInstance();
      GoogleAuth.signIn()
      console.log('func',changeLoggedIn)
      // Listen for sign-in state changes.
      GoogleAuth.isSignedIn.listen(updateSigninStatus);
  })
}

export function sayHi(){
    console.log(isAuthorized)
}
// 1. Load the JavaScript client library.
