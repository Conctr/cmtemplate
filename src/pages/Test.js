import React, { Component } from 'react';
import * as oauthApi        from '../api/oAuth'
import MuiThemeProvider     from 'material-ui/styles/MuiThemeProvider'
import CircularProgress     from 'material-ui/CircularProgress'
import TextField            from '../components/atoms/TextField'
import Checkbox             from '../components/atoms/Checkbox'
import FlatButton           from '../components/atoms/FlatButton'
import IconButton           from '../components/atoms/IconButton'
import RaisedButton         from '../components/atoms/RaisedButton'
import Menu                 from '../components/atoms/Menu'
import MenuItem             from '../components/atoms/MenuItem'
import Paper                from 'material-ui/Paper'
import ArrowDropRight       from 'material-ui/svg-icons/navigation-arrow-drop-right'

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      loading: false
    }
  }

  render() {
    return (
      <div>
        <TextField 
          hintText='hello'
          floatingLabelText='say hello'
          IconButton
        />
        <Checkbox />
        <FlatButton 
          label='hello'
        />
        <IconButton />
        <RaisedButton
          label=',,|,,'
        />
        <Paper>
          <Menu
            width={ 200 }
            multiple={ true }
          >
            <MenuItem primaryText='One' />
            <MenuItem primaryText='Two' />
            <MenuItem primaryText='Three' checked={ true } />
            <MenuItem
              primaryText='Four'
              rightIcon={<ArrowDropRight />}
              menuItems={[
                <MenuItem
                  primaryText="Show"
                  rightIcon={<ArrowDropRight />}
                  menuItems={[
                    <MenuItem primaryText="Show Level 2" />,
                    <MenuItem primaryText="Grid lines" checked={true} />,
                    <MenuItem primaryText="Page breaks" insetChildren={true} />,
                    <MenuItem primaryText="Rules" checked={true} />
                  ]}
                />,
              <MenuItem primaryText="Grid lines" checked={true} />,
              <MenuItem primaryText="Page breaks" insetChildren={true} />,
              <MenuItem primaryText="Rules" checked={true} />
              ]}
            />
          </Menu>
        </Paper>
        { this.state.loading ? (
          <MuiThemeProvider>
            <CircularProgress/>
          </MuiThemeProvider>
        ) : (
          <div>
            <h1>Testing</h1>
            { this.state.loggedIn ? (
              <button onClick={ oauthApi.sayHi }>
                Log in/Register to Conctr with Google
              </button>
            ) : (
              <button onClick={ oauthApi.signIn }>
                Log in with Google
              </button>
            )}
          </div>
        )}
      </div>
    )
  }
}

export default HomePage
