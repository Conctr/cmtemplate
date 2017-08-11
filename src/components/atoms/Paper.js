import React from 'react';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const style = {
  height: 100,
  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

const PaperExampleSimple = () => (
  <MuiThemeProvider>
    <Paper style={style} zDepth={3} />
  </MuiThemeProvider>
);

export default PaperExampleSimple;