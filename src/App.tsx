import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import EmployeeForm from './components/EmployeeForm';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';

class App extends Component {
  render() {
    return (
      <>
        <CssBaseline />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div className="App">
            <EmployeeForm />
          </div>
        </MuiPickersUtilsProvider>
      </>
    );
  }
}

export default App;
