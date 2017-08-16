import SettingsIcon from 'react-icons/lib/fa/cog';
import React from 'react';
import Drawer from 'material-ui/Drawer';
import ChipContainer from './ChipContainer';
import RaisedButton from '../atoms/RaisedButton';

export default class DrawerSimpleExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  render() {
    return (
      <div>
        <RaisedButton
          label={<SettingsIcon/>}
          onClick={this.handleToggle}
        />
        <Drawer open={this.state.open}
        openSecondary={true}
        width={400}>
        <ChipContainer
         handleGraphDelete={this.props.handleGraphDelete}
         handleGraphAdd={this.props.handleGraphAdd}
         sortedGraphs={this.props.sortedGraphs}/>
         <RaisedButton label="Close" onClick={this.handleClose}/>
        </Drawer>
      </div>
    );
  }
}
