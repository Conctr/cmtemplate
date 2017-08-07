import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import IconButton from '../atoms/IconButton'
import GoogleIcon from '../atoms/GoogleIcon'

export default function GoogleLoginButton ({

}) {
  return (
    <div>
      <MuiThemeProvider>
        <IconButton
          children={ <GoogleIcon /> } 
          iconClassName='google-oauth-icon' />
      </MuiThemeProvider>
    </div>
  )
}
