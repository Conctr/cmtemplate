import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import CircularProgress from 'material-ui/CircularProgress'
import RaisedButton from 'material-ui/RaisedButton'

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      loading: false
    }
  }

  startBinkUp = () => {
    let blinkup = window.BU // or blinkup = BU; if not using modules
    blinkup.getConfigId("dd8f9c0b4af5d0417bdfdf7916754d22", null, "production", function(err, configId){
        if (err){
            // Handle error
        } else {
            var networkConfig = new blinkup.NetworkConfig({
                ssid: "someSSID",
                password: "somePassword"
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

  render() {
    return (
      <div>
          <div id="form">
            <section className="submission-inputs">
              <button onClick={this.startBinkUp}>Connect Production Device</button>
              <button className="white-button" onclick="blinkUp('disconnect')">Clear Device Configuration</button>
            </section> /* end submission-inputs */

          </div> /* end form */

          <div className="lightbox" id="lightbox-blinkUp">
            <div>
              <p id="lightbox-close">&#10005;</p>
              /* Instructions on current step */
              <h3 id="current-instruction">Align device sensor to the screen</h3>
            </div>

            <div id="status">
              <center>
                <img id="progress-img" src="https://electricimp.com/public/img/progress.gif"/>
                <p id="result"></p>
              </center>
            </div>

            <div id="BU-progress">
            </div>

            /* For countdown */
            <div id="countdown" className="canvas">
              <p></p>
            </div>

            /* For Flashing */
            <div style={{backgroundColor: 'white'}}>
              <canvas id="BU-canvas" className="canvas"></canvas>
            </div>
          </div>
      </div>
    )
  }
}

export default HomePage
