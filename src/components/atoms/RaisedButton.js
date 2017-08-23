import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import FontIcon from 'material-ui/FontIcon';
import imgAvatar from '../../imgs/uxceo-128.jpg'

const styles = {
  button: {
    margin: 12,
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};

const NewRaisedButton = () => (
  <div>
    <RaisedButton
       label="Sally Jones"
       labelPosition="before"
       primary={true}
       icon={<AccountCircle />}
       style={styles.button}
     />
  </div>

);

export default NewRaisedButton;

// import React from 'react'
// import MuiThemeProvider from '../../styles/WimoThemeProvider'
// import Button from 'material-ui/RaisedButton'

// export default function RaisedButton(props) {
//   return (
//     <MuiThemeProvider>
//       <Button
//         {...props} />
//         
//     </MuiThemeProvider>
//   )
// }
