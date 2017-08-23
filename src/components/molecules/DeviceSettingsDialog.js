import SettingsIcon from 'react-icons/lib/fa/cog';
import React from 'react';
import Drawer from 'material-ui/Drawer';
import ChipContainer from './ChipContainer';
import RaisedButton from '../atoms/RaisedButton';
import TextField from '../atoms/TextField';
import RulesUI from './RulesUI'
export default class DeviceSettingsDialog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  onInputChange = (e, newValue) => {
    this.setState({
      [e.target.id]: newValue
    })
  }

  render() {
    let deviceData = this.props.deviceData
    console.log(this.state.deviceName)
    return (
      <div>
        <RaisedButton
          label={<SettingsIcon/>}
          onClick={this.handleToggle}
        />
        <Drawer open={this.state.open}
        openSecondary={true}
        width={400}>
        <TextField
          id='deviceName'
          defaultValue={deviceData.name}
          floatingLabelText="Device Name"
          onChange={this.onInputChange}
          onEnterKeyDown={() =>
            this.props.updateDevice(deviceData.id,{new_name: this.state.deviceName})
          }
          />
        <ChipContainer
         handleGraphDelete={this.props.handleGraphDelete}
         handleGraphAdd={this.props.handleGraphAdd}
         sortedGraphs={this.props.sortedGraphs}/>
          <RulesUI
            resetGraphsShown={this.props.resetGraphsShown}/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
         <RaisedButton label="Close" onClick={this.handleClose}/>

        </Drawer>
      </div>
    );
  }
}
