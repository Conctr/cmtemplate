import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import NavBar from '../components/molecules/NavBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from '../components/atoms/Paper'

class DashBoard extends Component {
  render() {
    return (
      /* <MuiThemeProvider>
        <Paper>
        <div>
        <h1>Welcome!</h1>
        <button onClick={()=> {this.props.onSignOut()}}>Sign Out</button>
        <br/>
        <Link to={`/devices`}><MuiThemeProvider><RaisedButton label="Devices" primary={true} /></MuiThemeProvider></Link>
      
      <Link to={'../components/atoms/DeviceList/'}>
      <MuiThemeProvider><RaisedButton/></MuiThemeProvider>
      </Link>
      
      </div>
      </Paper>
      </MuiThemeProvider> */
      <h1>jahsgdjfygs</h1>
    )
  }
}

export default DashBoard
