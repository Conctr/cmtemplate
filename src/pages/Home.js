import React, { Component } from 'react';

class HomePage extends Component {
  render() {
    return (
      <div>
        <h1>Welcome!</h1>
        <button onClick={()=> {this.props.onSignOut()}}>Sign Out</button>
      </div>
    )
  }
}

export default HomePage
