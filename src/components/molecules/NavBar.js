import React from 'react'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from '../atoms/RaisedButton'
import { Link } from 'react-router-dom'
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator
} from 'material-ui/Toolbar'
import logo from '../../imgs/wimo-logo-y.svg'

export default class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 3,
      openMenu: false
    }
  }

  handleChange = (event, index, value) => this.setState({value})

  handleOnRequestChange = (value) => {
    this.setState({
      openMenu: value
    })
  }

  handleOpenMenu = () => this.setState({openMenu: true});

  render() {
    return (
      <div>
        {this.props.signedIn ? (
          <Toolbar>
            <ToolbarGroup firstChild={true}>
              <img
                className='navbar-logo'
                src={ logo }
                alt='wimo logo'
              />
            </ToolbarGroup>
            <ToolbarGroup>
              <ToolbarSeparator />
              <RaisedButton
                onTouchTap={this.handleOpenMenu}
                label='Dave Chapelle'
              />
              <IconMenu
                iconButtonElement={
                  <IconButton touch={true}>
                    <NavigationExpandMoreIcon />
                  </IconButton>
                }
                onRequestChange={this.handleOnRequestChange}
                open={this.state.openMenu}
              >
                <Link to={'/Blog'}>
                  <MenuItem primaryText="Blog" />
                </Link>
                <Link to={'/Contact'}>
                  <MenuItem primaryText="Contact" />
                </Link>
                <MenuItem
                  onTouchTap={this.props.logOut}
                  primaryText="Log Out"
                />
              </IconMenu>
            </ToolbarGroup>
          </Toolbar>
        ) : (
          false
        )}
      </div>
    )
  }
}
