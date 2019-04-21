import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import DateFnsUtils from '@date-io/date-fns';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SmsLog from './screens/SmsLog';
import EmployeeList from './screens/EmployeeList';
import EmployeeInfo from './screens/EmployeeInfo';
import EmployeeForm from './screens/EmployeeForm';
import EmployerForm from './screens/EmployerForm';
import E8Form from './screens/E8Form';
import { IEmployee } from './interfaces/IEmployee';
import AppShell from './components/AppShell/AppShell';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});
function App() {
  const employees: IEmployee[] = [
    { name: 'Χιοννίδης Ιωάννης', vat: '105356894' },
    { name: 'Ταργαρίδη Δανάη', vat: '105356894' },
  ];

  const [drawerState, setDrawerState] = useState(false);
  const toggleDrawerState = () => setDrawerState(!drawerState);

  return (
    <>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Router>
            <div className="App">
              <Route
                path="/"
                render={props => (
                  <AppShell
                    toggleDrawerOpen={toggleDrawerState}
                    isDrawerOpen={drawerState}
                    {...props}
                  />
                )}
              />
              <Route
                path="/"
                exact
                render={props => <EmployeeList employees={employees} {...props} />}
              />
              <Route path="/smsLog/" component={SmsLog} />
              <Route path="/employeeInfo/" component={EmployeeInfo} />
              <Route path="/employeeForm/" component={EmployeeForm} />
              <Route path="/employerForm/" component={EmployerForm} />
              <Route path="/e8Form/" component={E8Form} />
            </div>
          </Router>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </>
  );
}

export default App;
