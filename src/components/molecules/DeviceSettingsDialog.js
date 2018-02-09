import React from "react"
import Drawer from "material-ui/Drawer"
import ChipContainer from "./ChipContainer"
import IconButton from "material-ui/IconButton"
import Settings from "material-ui/svg-icons/action/settings"
import TextField from "../atoms/TextField"
import RulesUI from "./RulesUI"
export default class DeviceSettingsDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = { open: false }
  }

  handleToggle = () => this.setState({ open: !this.state.open })

  handleClose = () => this.setState({ open: false })

  onInputChange = (e, newValue) => {
    this.props.newDeviceName(newValue)
    this.setState({
      [e.target.id]: newValue
    })
  }

  render() {
    let deviceData = this.props.deviceData
    return (
      <div className="device-settings">
        <IconButton
          className="device-settings-modal-button"
          iconStyle={{
            width: 48,
            height: 48
          }}
          style={{
            width: 96,
            height: 96
          }}
        >
          <Settings onClick={this.handleToggle} />
        </IconButton>
        <Drawer open={this.state.open} openSecondary={true} width={400}>
          <TextField
            id="deviceName"
            defaultValue={deviceData.name}
            floatingLabelText="Device Name"
            onChange={this.onInputChange}
            onEnterKeyDown={() => {
              // this.props.updateDevice(deviceData.id,{new_name: this.state.deviceName})
            }}
          />
          <ChipContainer
            handleGraphDelete={this.props.handleGraphDelete}
            handleGraphAdd={this.props.handleGraphAdd}
            sortedGraphs={this.props.sortedGraphs}
          />
          <RulesUI
            keysShown={this.props.keysShown}
            handleClose={this.handleClose}
            saveSettings={this.props.saveSettings}
            resetGraphsShown={this.props.resetGraphsShown}
            sortedGraphs={this.props.sortedGraphs}
          />
        </Drawer>
      </div>
    )
  }
}
