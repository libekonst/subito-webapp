import React, { FC, useState, useEffect } from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import EmployeeListItem from './EmployeeListItem';
import { IEmployee } from '../../interfaces/IEmployee';
import IconButton from '@material-ui/core/IconButton';
import BackupIcon from '@material-ui/icons/Backup';
import { AppBar, DrawerToolbar, AppDrawer } from '../../components/AppShell';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/PersonAdd';
import { Link } from 'react-router-dom';
import { routes } from '../../routes';
import db from '../../db/db';

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
      try {
        const employees = await db.employee.toCollection().toArray();
        setEmployees(employees);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchEmployees();
  }, []);
  const LinkToEmployeeForm = (props: any) => (
    <Link to={routes.EMPLOYEE_FORM} {...props} />
  );
  return (
    <>
      <AppBar color="primary">
        <DrawerToolbar
          onOpenDrawer={toggleDrawerState}
          pageTitle="Υπάλληλοι"
          secondaryActions={
            <IconButton color="inherit">
              <BackupIcon />
            </IconButton>
          }
        />
      </AppBar>
      <AppDrawer toggleOpen={toggleDrawerState} isOpen={drawerState} />
      <Fab
        color="primary"
        aria-label="Add"
        className={classes.fab}
        component={LinkToEmployeeForm}
      >
        <AddIcon />
      </Fab>
      <List className={classes.list}>
        {employees.map(e => (
          <EmployeeListItem employee={e} key={e.id} />
        ))}
      </List>
    </>
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
    },
  });

export default withStyles(styles)(EmployeeList);
