import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import NavBar from '../components/molecules/NavBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class HomePage extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider>
       <NavBar/>
       </MuiThemeProvider>
        <h1>Welcome!</h1>
        <button onClick={()=> {this.props.onSignOut()}}>Sign Out</button>
        <br/>
        <Link to={`/devices`}><MuiThemeProvider><RaisedButton label="Devices" primary={true} /></MuiThemeProvider></Link>
      </div>
    )
  }
}

export default HomePage
