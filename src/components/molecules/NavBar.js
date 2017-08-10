import React from 'react';
import { NavLink } from 'react-router-dom';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router-dom'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

// export default ({
//     isSignedIn = false
// }) => (
//     <nav>
//         <NavLink exact to='/' activeClassName='active'>Home</NavLink>
//     </nav>
// )


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
            <DropDownMenu value={this.state.value} onChange={this.handleChange}>
            <Link to={'/Home'}>
            <MenuItem value={1} primaryText="Temperature" />
            </Link>
            <Link to={'/Home'}>
            <MenuItem value={2} primaryText="Humidity" />
            </Link>
            <Link to={'/Home'}>
            <MenuItem value={3} primaryText="VOC" />
            </Link>
            <Link to={'/Home'}>
            <MenuItem value={6} primaryText="Light" />
            </Link>
          </DropDownMenu>
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
            <Link to={'/Login'}>
            <MenuItem primaryText="Log Out" />
            </Link>
          </IconMenu>
        </ToolbarGroup>
        </Toolbar>
        ) : (
          <Toolbar>
          <h1>'Log in dude'</h1>
          </Toolbar>
        )}
      
      </MuiThemeProvider>
      
    );
  }
}
