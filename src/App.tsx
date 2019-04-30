import React, { useState } from 'react';
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

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});
function App() {
  const employees: IEmployee[] = [
    { name: 'Χιοννίδης Ιωάννης', vat: '105356894' },
    { name: 'Ταργαρίδη Δανάη', vat: '105326894' },
    { name: 'Φλοίσβου Μαρίνα', vat: '105336894' },
    { name: 'Ντάβος Σερ', vat: '105356897' },
    { name: 'Ιωαννίνων Λίμνη', vat: '105056894' },
    { name: '', vat: '205056894' },
  ];

  // Form states. Lift each screen's form state here.
  const [employeeState, setEmployeeState] = useState<IEmployee[]>(employees);
  const [employerFormState, setEmployerFormState] = useState<Partial<IEmployer>>({});
  const [e8FormState, setE8FormState] = useState<Partial<IE8Form>>({});
  const handleSubmitEmployee = (employee: any) => {
    const updatedEmployees = [...employees, employee];
    setEmployeeState(updatedEmployees);
  };
  const handleSubmitEmployerForm = () => null;
  const handleSubmitE8Form = () => null;

  return (
    <>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Router basename="/subito-webapp">
            <div className="App">
              <Switch>
                <Route
                  path="/employeeList"
                  render={props => <EmployeeList employees={employeeState} />}
                />
                {/* TODO: Redirect "/smsLog/ambiguous" to '/smsLog' to avoid pushing to history and causing render/fetch onBack */}
                <Route path="/smsLog/" component={SmsLog} />
                <Route
                  path="/employeeInfo/"
                  render={props => (
                    <EmployeeInfo
                      employee={employeeState.find(e =>
                        props.location.search.includes(e.vat),
                      )}
                    />
                  )}
                />
                <Route
                  path="/employeeForm/"
                  render={props => <EmployeeForm addToState={handleSubmitEmployee} />}
                />
                <Route path="/employerForm/" component={EmployerForm} />
                <Route
                  path="/e8Form/"
                  render={props => {
                    console.log(props.history);
                    return (
                      <E8Form
                        employee={employeeState.find(e =>
                          props.location.search.includes(e.vat),
                        )}
                        onGoBack={props.history.goBack}
                      />
                    );
                  }}
                />
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
