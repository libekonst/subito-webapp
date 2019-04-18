import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import EmployerForm from './screens/EmployerForm';

class App extends Component {
  render() {
    return (
      <>
        <CssBaseline />
        <EmployerForm />
      </>
    );
  }
}

export default App;
