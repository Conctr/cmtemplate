import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ssid: null,
      password: null
    }
  }
  // Perform the BlinkUp (flashing)
  startDisconnectBinkUp = () => {
    window.BU.startDisconnectFlash({},
    function () {
      // On complete
      // Hide the canvas and progress bar now that BlinkUp is complete
      // hideFlashingElements();
      // hidePollingProgress();

      // Display the results as success
      // setInstruction('Complete');
      // document.getElementById('status').style.display = 'block';
      // showResult('Your device should now be flashing amber', true);
      return;
    }
    )
  }

  startBinkUp = (ssid,password) => {
    console.log('credentials',ssid,password)
    let blinkup = window.BU // or blinkup = BU; if not using modules
    blinkup.getConfigId("dd8f9c0b4af5d0417bdfdf7916754d22", null, "production", function(err, configId){
        if (err){
            // Handle error
        } else {
            var networkConfig = new blinkup.NetworkConfig({
                ssid: ssid,
                password: password
            });

            blinkup.startNetworkFlash(configId, networkConfig,
                function(){
                    blinkup.pollForDeviceInfo(configId, function(err, data){
                        if (err){
                            // Handle error
                            // (device rejected or server connection timed out)
                            console.log('err',err)
                        }
                        else if (data){
                          console.log('data',data)
                        }
                    });
                }
            );
        }
    });
  }
  handleWifiChange = (event,newString) => {
    console.log(newString)
    this.setState({ ssid: newString})
  }
  handlePasswordChange = (event,newString) => {
    console.log(newString)
    this.setState({ password: newString})
  }

  render() {
    return (
      <div>
          <MuiThemeProvider>
            <TextField
              onChange={this.handleWifiChange}
              floatingLabelText='Wifi name'/>
          </MuiThemeProvider>
          <br/>
          <MuiThemeProvider>
            <TextField
              onChange={this.handlePasswordChange}
              floatingLabelText='Wifi password'
              type='Password'/>
          </MuiThemeProvider>
          <br/>
          <MuiThemeProvider>
            <RaisedButton
              style={{width: '40%',marginRight: 'auto',marginLeft: 'auto'}}
              onTouchTap={() => this.startBinkUp(this.state.ssid,this.state.password)}
              label='Connect C1'
            />
          </MuiThemeProvider> <br/>
          <MuiThemeProvider>
            <RaisedButton
              style={{width: '40%',marginRight: 'auto',marginLeft: 'auto'}}
              onTouchTap={this.startDisconnectBinkUp}
              label='Clear C1 Configuration'/>
            </MuiThemeProvider>
          <div className="lightbox" id="lightbox-blinkUp">

            <div id="BU-progress">
            </div>

            <div id="countdown" className="canvas">
              <p></p>
            </div>
            <div style={{backgroundColor: 'white'}}>
              <canvas style={{borderSize: '2px',borderStyle: 'solid'}} id="BU-canvas" className="canvas"></canvas>
            </div>
          </div>
      </div>
    )
  }
}

export default HomePage
