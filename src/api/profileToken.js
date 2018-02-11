import jwt from 'jsonwebtoken'
import { rememberToken, getValidToken } from './token'
import decodeJWT from 'jwt-decode'

// enviroment variable
const secret = process.env.REACT_APP_PROFILE_SECRET

export function setEncodedToken(payload) {
    const profileDataKey = 'profileDataToken'
  if (payload) {
    const encodedToken = jwt.sign(payload, secret);
    rememberToken(encodedToken, profileDataKey)
  } else {
    localStorage.removeItem(profileDataKey)
  }
}

export function getProfileDecodedToken() {
  const profileDataKey = 'profileDataToken'
  const validToken = getValidToken(profileDataKey)
  if(validToken) {
    return decodeJWT(validToken)
  }
  else {
    return null
  }
}