import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import DateFnsUtils from '@date-io/date-fns';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import SmsLog from './screens/SmsLog';
import EmployeeList from './screens/EmployeeList';
import EmployeeInfo from './screens/EmployeeInfo';
import EmployeeForm from './screens/EmployeeForm';
import EmployerForm from './screens/EmployerForm';
import E8Form from './screens/E8Form';
import { IEmployee, IE8Sms, IEmployer, IE8Form } from './interfaces';
import db from './db/db';
import { routes } from './constants/routes';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});
function App() {
  return (
    <>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Router basename="/subito-webapp">
            <div className="App">
              <Switch>
                <Route path={routes.EMPLOYEE_LIST} component={EmployeeList} />
                <Route path="/smsLog/" component={SmsLog} />
                <Route
                  path={`${routes.EMPLOYEE_INFO}/:employeeID`}
                  component={EmployeeInfo}
                />
                <Route
                  path={`${routes.EMPLOYEE_FORM}/:employeeID`}
                  component={EmployeeForm}
                />
                <Route path={routes.EMPLOYEE_FORM} component={EmployeeForm} />
                <Route path="/employerForm/" component={EmployerForm} />
                <Route path="/e8Form/:employeeID" component={E8Form} />
                <Redirect to="/employeeList" />
              </Switch>
            </div>
          </Router>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </>
  );
}

export default App;
