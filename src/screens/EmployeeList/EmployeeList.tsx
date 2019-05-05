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
import NotFound from '../../components/NotFound';
import CenteredSpinner from '../../components/CenteredSpinner';

interface IProps extends WithStyles<typeof styles> {
  classes: any;
  // employees: IEmployee[];
}
const EmployeeList: FC<IProps> = props => {
  const { classes } = props;

  const [drawerState, setDrawerState] = useState(false);
  const toggleDrawerState = () => setDrawerState(!drawerState);

  const [isLoading, toggleLoading] = useState(true);
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
      toggleLoading(false);
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
            !isLoading &&
            employees.length !== 0 && (
              <IconButton
                color="inherit"
                onClick={handleExportToCSV}
                title="Αποθήκευση σε CSV"
              >
                <SaveIcon />
              </IconButton>
            )
          }
        />
      </AppBar>
      <AppDrawer toggleOpen={toggleDrawerState} isOpen={drawerState} />
      <div
        className={`${classes.fabContainer} ${!isLoading &&
          employees.length === 0 &&
          classes.grow}`}
      >
        <Fab
          color="default"
          aria-label="Add"
          component={LinkToEmployeeForm}
          // className={classes.fab}
          className={`${classes.fab} ${!isLoading &&
            employees.length === 0 &&
            classes.fabGrow}`}
        >
          <AddIcon color="primary" />
        </Fab>
      </div>
      {isLoading && <CenteredSpinner />}
      <Fade in={!isLoading}>
        <div>
          {employees.length === 0 && (
            <NotFound icon="people" message="Προσθέστε υπαλλήλους για να συνεχίσετε" />
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
      backgroundColor: 'white',
    },
    fabContainer: {
      position: 'fixed',
      // display: 'flex',
      bottom: 0,
      right: 0,
      padding: theme.spacing.unit * 2,
    },
    '@keyframes growAnimation': {
      from: { transform: 'scale(2.8)' },
      to: { transform: 'scale(3.5)' },
    },
    '@keyframes fabGrowAnimation': {
      from: { transform: 'scale(1)' },
      to: { transform: 'scale(1.1)' },
    },
    fabGrow: {
      '&:before': {
        content: '""',
        position: 'absolute',
        zIndex: -1,
        borderRadius: '50%',
        width: '100%',
        height: '100%',
        // margin: 'auto',
        // top: 0,
        // right: 0,
        // bottom: 0,
        // left: 0,
        backgroundColor: 'white',
        animation: '1s alternate fabGrowAnimation ease-out infinite',
      },
    },
    grow: {
      '&:before': {
        content: '""',
        position: 'absolute',
        zIndex: -1,
        borderRadius: '50%',
        width: '100%',
        height: '100%',
        // margin: 'auto',
        // top: 0,
        // right: 0,
        // bottom: 0,
        // left: 0,
        backgroundColor: theme.palette.primary.main,
        animation: '1s alternate growAnimation ease-out infinite',
      },
    },
  });

export default withStyles(styles)(EmployeeList);
