import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class HomePage extends Component {
  render() {
    return (
        <div>
        <h1>Welcome!</h1>
        <button onClick={()=> {this.props.onSignOut()}}>Sign Out</button>
        <br/>
        <Link to={`/devices`}><MuiThemeProvider><RaisedButton label="Devices" primary={true} /></MuiThemeProvider></Link>
      
      <Link to={'../components/atoms/DeviceList/'}>
      <MuiThemeProvider><RaisedButton/></MuiThemeProvider>
      </Link>
      
      </div>
    )
  }
}

export default HomePage
