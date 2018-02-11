import React from "react"
import Avatar from "material-ui/Avatar"
import IconMenu from "material-ui/IconMenu"
import IconButton from "material-ui/IconButton"
import MenuItem from "material-ui/MenuItem"
import RaisedButton from "material-ui/RaisedButton"
import NavigationExpandMoreIcon from "material-ui/svg-icons/navigation/expand-more"
import { Toolbar, ToolbarGroup, ToolbarSeparator } from "material-ui/Toolbar"
import logo from "../../imgs/logoImage.jpg"
import { getProfileDecodedToken } from "../../api/profileToken"

export default class NavBar extends React.Component {
  state = {
    value: 3,
    openMenu: false,
    // checks local storage to get user data
    userData: getProfileDecodedToken()
  }

  handleChange = (event, index, value) => this.setState({ value })

  handleOnRequestChange = value => {
    this.setState({
      openMenu: value
    })
  }

  handleOpenMenu = () => this.setState({ openMenu: true })

  render() {
    const { userData } = this.state
    const logoImage = process.env.REACT_APP_LOGO_IMAGE_URL || logo
    return (
      <div>
        {this.props.signedIn ? (
          <Toolbar>
            <ToolbarGroup firstChild={true}>
              <img className="navbar-logo" src={logoImage} alt="app logo" />
            </ToolbarGroup>
            <ToolbarGroup>
              <ToolbarSeparator />
              <RaisedButton
                primary={true}
                onTouchTap={this.handleOpenMenu}
                icon={<Avatar src={userData && userData.imageUrl} size={30} />}
                label={userData && userData.name}
              />
              <IconMenu
                className="float-menu"
                iconButtonElement={
                  <IconButton touch={true}>
                    <NavigationExpandMoreIcon />
                  </IconButton>
                }
                onRequestChange={this.handleOnRequestChange}
                open={this.state.openMenu}
                anchorOrigin={{ horizontal: "left", vertical: "top" }}
                targetOrigin={{ horizontal: "left", vertical: "top" }}
              >
                <a href="https://conctr.com" className="naked-href">
                  <MenuItem primaryText="About Conctr" />
                </a>
                <a href="mailto:support@conctr.com" className="naked-href">
                  <MenuItem primaryText="Email Conctr Support" />
                </a>
                <MenuItem
                  onTouchTap={() => {
                    this.props.logOut()
                    this.setState({ openMenu: false })
                    this.setState({ userData: null })
                  }}
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
  componentWillReceiveProps(nextProps) {
    this.setState({ userData: getProfileDecodedToken() })
  }
}
