import React, { Component } from 'react';
import * as oauthApi from '../api/oAuth'

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    }
  }

  changeLoggedIn = (loggedIn) => {
    this.setState({
      loggedIn
    })
  }

  render() {
    return (
      <div>
        <h1>{this.state.loggedIn ? ('LoggedIn') : ('LoggedOut') }</h1>
      <h1>Testing</h1>
      <button onClick={() => {
          oauthApi.start(this.changeLoggedIn)
        }}>
          Start Me</button>
      <button onClick={() => {
          oauthApi.sayHi()
        }}>
          Me After</button>
      </div>
    )
  }
}

export default HomePage
