import React from 'react'
import Avatar from 'material-ui/Avatar'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator } from 'material-ui/Toolbar'
import logo from '../../imgs/wimo-logo-y.svg'
import {getUserDetails} from '../../api/oAuth'


export default class NavBar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: 3,
      openMenu: false
    }
  }

  handleChange = (event, index, value) => this.setState({ value })

  handleOnRequestChange = (value) => {
    this.setState({
      openMenu: value
    })
  }

  handleOpenMenu = () => this.setState({ openMenu: true });

  render() {
    let firstName, lastName, avatarUser
      getUserDetails()["firstname"]
      ? firstName = getUserDetails()["firstname"]
      : firstName = 'Set'


      getUserDetails()["lastname"]
      ? lastName = getUserDetails()["lastname"]
      : lastName = 'Profile'

      if(getUserDetails()["avatar"]){
        avatarUser = getUserDetails()["avatar"]
      } else {
        avatarUser = 'https://mysticpants.com/_include/img/CONCTR-LOGO-MUSTARD-LINE.png'
      }

    return (
      <div>
        {this.props.signedIn ? (
          <Toolbar>
            <ToolbarGroup firstChild={ true }>
              <img
                className='navbar-logo'
                src={ logo }
                alt='wimo logo'
              />
            </ToolbarGroup>
            <ToolbarGroup>
              <ToolbarSeparator />
              <RaisedButton
                primary={ true }
                onTouchTap={ this.handleOpenMenu }
                icon={
                  <Avatar
                    // src="http://i.telegraph.co.uk/multimedia/archive/03388/enfield_3388479b.jpg"
                    src={avatarUser}
                    size={ 30 }
                  />
                }
                label={ firstName + ' ' + lastName }
              />
              <IconMenu
                className='float-menu'
                iconButtonElement={
                  <IconButton touch={ true }>
                    <NavigationExpandMoreIcon />
                  </IconButton>
                }
                onRequestChange={ this.handleOnRequestChange }
                open={ this.state.openMenu }
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
              >
                <a
                  href='https://conctr.com'
                  className='naked-href'
                >
                  <MenuItem primaryText="About Conctr" />
                </a>
                <a
                  href="mailto:support@conctr.com"
                  className='naked-href'
                >
                  <MenuItem primaryText="Email Conctr Support" />
                </a>
                <MenuItem
                  onTouchTap={ this.props.logOut }
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
