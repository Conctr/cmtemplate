import React, { Component } from 'react';
import * as oauthApi from '../api/oAuth'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import CircularProgress from 'material-ui/CircularProgress'

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      loading: false
    }
  }

  changeLoading = (loading) => {
    this.setState({
      loading
    })
  }
  componentDidMount() {
    oauthApi.start(this.changeLoggedIn,this.changeLoading)
  }

  render() {
    return (
      <div>
        {this.state.loading ? (
          <MuiThemeProvider>
            <CircularProgress/>
          </MuiThemeProvider>
        ) : (
          <div>
          <h1>Testing</h1>
          {this.state.loggedIn ? (
            <button onClick={oauthApi.sayHi}>
              Login/Register to conctr with google
            </button>
          ) : (
            <button onClick={oauthApi.signIn}>
              SignIn with Google
            </button>
          )}
          </div>
        )}
      </div>
    )
  }
}

export default HomePage
