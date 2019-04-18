import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import { EmployeeForm } from './components/EmployeeForm';

class App extends Component {
  render() {
    return (
      <>
        <CssBaseline />
        <div className="App">
          <EmployeeForm />
        </div>
      </>
    );
  }
}

export default App;
