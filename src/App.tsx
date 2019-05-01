import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import DateFnsUtils from '@date-io/date-fns';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  RouteComponentProps,
} from 'react-router-dom';
import SmsLog from './screens/SmsLog';
import EmployeeList from './screens/EmployeeList';
import EmployeeInfo from './screens/EmployeeInfo';
import EmployeeForm from './screens/EmployeeForm';
import EmployerForm from './screens/EmployerForm';
import E8Form from './screens/E8Form';
import { IEmployee, IE8Sms, IEmployer, IE8Form } from './interfaces';
import db from './db/db';
import { routes } from './routes';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});
function App() {
  const employees: IEmployee[] = [
    {
      name: 'Χιοννίδης Ιωάννης',
      vat: '105356894',
      workStart: new Date(),
      workFinish: new Date(),
    },
    {
      name: 'Ταργαρίδη Δανάη',
      vat: '105326894',
      workStart: new Date(),
      workFinish: new Date(),
    },
    {
      name: 'Φλοίσβου Μαρίνα',
      vat: '105336894',
      workStart: new Date(),
      workFinish: new Date(),
    },
    {
      name: 'Ντάβος Σερ',
      vat: '105356897',
      workStart: new Date(),
      workFinish: new Date(),
    },
    {
      name: 'Ιωαννίνων Λίμνη',
      vat: '105056894',
      workStart: new Date(),
      workFinish: new Date(),
    },
    { name: '', vat: '205056894', workStart: new Date(), workFinish: new Date() },
  ];

  // Form states. Lift each screen's form state here.
  const [employeesState, setEmployeesState] = useState<IEmployee[]>(employees);
  const [employerFormState, setEmployerFormState] = useState<Partial<IEmployer>>({});
  const [e8FormState, setE8FormState] = useState<Partial<IE8Form>>({});

  const updateEmployeesState = async () => {
    try {
      const employees = await db.employee.toCollection().toArray();
      setEmployeesState(employees);
    } catch (error) {
      console.log(error);
    }
  };
  const findEmployee = (location: any) => {
    // try {
    //   const employee = await db.employee.get({ id: location.state.id });
    //   return employee;
    // } catch (error) {}
    // return employeesState.find(e => location.search === e.id);
    return employees;
  };
  const handleSubmitEmployee = (employee: any) => {
    const updatedEmployees = [...employees, employee];
    setEmployeesState(updatedEmployees);
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
                <Route path={routes.EMPLOYEE_LIST} component={EmployeeList} />
                {/* TODO: Redirect "/smsLog/ambiguous" to '/smsLog' to avoid pushing to history and causing render/fetch onBack */}
                <Route path="/smsLog/" component={SmsLog} />
                <Route
                  path={`${routes.EMPLOYEE_INFO}/:employeeID`}
                  component={EmployeeInfo}
                />
                <Route
                  path={`${routes.EMPLOYEE_FORM}/:employeeID`}
                  component={EmployeeForm}
                />
                <Route path="/employerForm/" component={EmployerForm} />
                {/* <Route
                  path="/e8Form/"
                  render={props => {
                    console.log(props.history);
                    return (
                      <E8Form
                        employee={findEmployee(props.location)}
                        onGoBack={props.history.goBack}
                      />
                    );
                  }}
                /> */}
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
