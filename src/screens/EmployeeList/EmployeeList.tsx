import React, { FC, useState, useEffect } from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import EmployeeListItem from './EmployeeListItem';
import { IEmployee } from '../../interfaces/IEmployee';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import { AppBar, DrawerToolbar, AppDrawer } from '../../components/AppShell';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/PersonAdd';
import { Link } from 'react-router-dom';
import { routes } from '../../routes';
import db from '../../db/db';
import Fade from '@material-ui/core/Fade';
import { exportToCsvEmployees } from '../../utils/exportToCSV';
import EmptyList from '../../components/EmptyList';

interface IProps extends WithStyles<typeof styles> {
  classes: any;
  // employees: IEmployee[];
}
const EmployeeList: FC<IProps> = props => {
  const { classes } = props;

  const [drawerState, setDrawerState] = useState(false);
  const toggleDrawerState = () => setDrawerState(!drawerState);

  const [isLoading, setIsLoading] = useState(true);
  const [employees, setEmployees] = useState<IEmployee[]>([]);

  // Empty array as 2nd arg to run the effect only after the first render.
  // Similar to componentdidmount.
  useEffect(() => {
    async function fetchEmployees() {
      let employees;
      try {
        employees = await db.employee.toCollection().toArray();
      } catch (error) {
        console.log(error);
      }
      setEmployees(employees || []);
      setIsLoading(false);
    }
    fetchEmployees();
  }, []);
  const LinkToEmployeeForm = (props: any) => (
    <Link to={routes.EMPLOYEE_FORM} {...props} />
  );
  const handleExportToCSV = () => exportToCsvEmployees(employees);
  return (
    <div>
      <AppBar color="default">
        <DrawerToolbar
          onOpenDrawer={toggleDrawerState}
          pageTitle="Υπάλληλοι"
          secondaryActions={
            <IconButton color="inherit" onClick={handleExportToCSV}>
              <SaveIcon />
            </IconButton>
          }
        />
      </AppBar>
      <AppDrawer toggleOpen={toggleDrawerState} isOpen={drawerState} />
      <Fab
        color="default"
        aria-label="Add"
        className={classes.fab}
        component={LinkToEmployeeForm}
      >
        <AddIcon color="primary" />
      </Fab>
      <Fade in={!isLoading}>
        <div>
          {employees.length === 0 && (
            <EmptyList icon="people" message="Προσθέστε υπαλλήλους για να συνεχίσετε" />
          )}
          {employees.length !== 0 && (
            <List className={classes.list}>
              {employees.map(e => (
                <EmployeeListItem employee={e} key={e.id} />
              ))}
            </List>
          )}
        </div>
      </Fade>
    </div>
  );
};

const styles = (theme: Theme) =>
  createStyles({
    list: {
      width: '100%',
      margin: 'auto',
      paddingBottom: '100px',
    },
    fab: {
      position: 'fixed',
      bottom: 0,
      right: 0,
      margin: theme.spacing.unit * 2,
      backgroundColor: 'white',
    },
  });

export default withStyles(styles)(EmployeeList);
