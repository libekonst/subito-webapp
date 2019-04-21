import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import EmployeeForm from './components/EmployeeForm/EmployeeForm';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import EmployeeInfo from './components/EmployeeInfo/EmployerInfo';
import SmsLog from './components/SmsLog/SmsLog';
import EmployeeList from './components/EmployeeList/EmployeeList';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});
class App extends Component {
  render() {
    return (
      <>
        <CssBaseline />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Router>
            <div className="App">
              <Route path="/" exact component={EmployeeList} />
              <Route path="/smsLog/" component={SmsLog} />
              <Route path="/employeeInfo/" component={EmployeeInfo} />
              <Route path="/employeeForm/" component={EmployeeForm} />
            </div>
          </Router>
        </MuiPickersUtilsProvider>
      </>
    );
  }
}

export default App;
