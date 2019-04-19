import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import EmployerForm from './screens/EmployerForm';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});
class App extends Component {
  render() {
    return (
      <>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <EmployerForm />
        </MuiThemeProvider>
      </>
    );
  }
}

export default App;
