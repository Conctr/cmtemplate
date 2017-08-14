import React from 'react';
import MuiThemeProvider from '../../styles/WimoThemeProvider';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from '../atoms/RaisedButton';
import { Link } from 'react-router-dom'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';


export default class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 3,
    };
  }

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <MuiThemeProvider>
        {this.props.signedIn ? (
            <Toolbar>
            <ToolbarGroup firstChild={true}>
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarTitle text="Wimo" />
          <FontIcon className="muidocs-icon-custom-sort" />
          <ToolbarSeparator />
          <Link to={'/Devices'}>
          <RaisedButton label="Change Device" primary={true} />
          </Link>
          <IconMenu
            iconButtonElement={
              <IconButton touch={true}>
                <NavigationExpandMoreIcon />
              </IconButton>
            }
          >
            <Link to={'/Blog'}>
            <MenuItem primaryText="Blog" />
            </Link>
            <Link to={'/Contact'}>
            <MenuItem primaryText="Contact" />
            </Link>
            <MenuItem onTouchTap={this.props.logOut} primaryText="Log Out" />
          </IconMenu>
        </ToolbarGroup>
        </Toolbar>
        ) : (
          <Toolbar>
          <RaisedButton label='SignIn'/>
          </Toolbar>
        )}

      </MuiThemeProvider>

    );
  }
}
