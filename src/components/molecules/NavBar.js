import React from 'react';
import { NavLink } from 'react-router-dom';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
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
      
        <Toolbar>
        {this.props.signedIn ? (
          <ToolbarGroup firstChild={true}>
          <DropDownMenu value={this.state.value} onChange={this.handleChange}>
            <MenuItem value={1} primaryText="Temperature" />
            <MenuItem value={2} primaryText="Humidity" />
            <MenuItem value={3} primaryText="VOC" />
            <MenuItem value={4} primaryText="Movement" />
            <MenuItem value={5} primaryText="Pressure" />
            <MenuItem value={6} primaryText="Light" />
            <MenuItem value={7} primaryText="Activity" />
          </DropDownMenu>
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarTitle text="Wimo" />
          <FontIcon className="muidocs-icon-custom-sort" />
          <ToolbarSeparator />
          <Link to={'/'}>
          <RaisedButton label="Change Device" primary={true} />
          </Link>
          <IconMenu
            iconButtonElement={
              <IconButton touch={true}>
                <NavigationExpandMoreIcon />
              </IconButton>
            }
          >
            <MenuItem primaryText="Blog" />
            <MenuItem primaryText="Contact" />
            <MenuItem primaryText="Log Out" />
          </IconMenu>
        </ToolbarGroup>

        ) : (
          <h1>'Log in dude'</h1>
        )}
      </Toolbar>
      
    );
  }
}
