import React, { FC, useState, useEffect } from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import EmployeeListItem from './EmployeeListItem';
import { IEmployee } from '../../interfaces/IEmployee';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/SaveAlt';
import { AppBar, DrawerToolbar, AppDrawer } from '../../components/AppShell';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/PersonAdd';
import { Link } from 'react-router-dom';
import { routes } from '../../constants/routes';
import db from '../../db/db';
import Fade from '@material-ui/core/Fade';
import { exportToCsvEmployees } from '../../utils/exportToCSV';
import NotFound from '../../components/NotFound';
import CenteredSpinner from '../../components/CenteredSpinner';
import { IEmployer } from '../../interfaces';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LaunchIcon from '@material-ui/icons/NavigateNext';
import Divider from '@material-ui/core/Divider';
import { empty } from '../../constants';

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
  const [employer, setEmployer] = useState<IEmployer | undefined>();

  const [anchorEl, setAnchorEl] = useState(null);
  const [targettedEmployeeId, setTargettedEmployeeId] = useState<number | undefined>();
  // TODO: add undo delete
  const [deletedEmployee, setDeletedEmployee] = useState<IEmployee | undefined>();
  const handleOpenMenu = (id?: number) => (event: any) => {
    setTargettedEmployeeId(id);
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => setAnchorEl(null);
  // const handleCloseMenu = (e: any) => console.log(e.currentTarget);

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
  }, [deletedEmployee]);
  useEffect(() => {
    async function fetchEmployer() {
      let employer;
      try {
        employer = await db.employer.toCollection().last();
      } catch (error) {
        console.log(error);
      }
      setEmployer(employer);
    }
    fetchEmployer();
  }, []);
  const LinkToEmployeeFormNew = (props: any) => (
    <Link to={routes.EMPLOYEE_FORM} {...props} />
  );
  const LinkToEmployeeFormEdit = (props: any) => (
    <Link to={`${routes.EMPLOYEE_FORM}/${targettedEmployeeId}`} {...props} />
  );
  const LinkToEmployeeInfo = (props: any) => (
    <Link to={`${routes.EMPLOYEE_INFO}/${targettedEmployeeId}`} {...props} />
  );
  // DELETE employee
  const handleDelete = async () => {
    if (!targettedEmployeeId) return;
    try {
      const toDelete = await db.employee.get(targettedEmployeeId);
      await db.employee.delete(targettedEmployeeId);
      handleCloseMenu();
      setDeletedEmployee(toDelete);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <AppBar>
        <DrawerToolbar onOpenDrawer={toggleDrawerState} pageTitle="Υπάλληλοι" />
      </AppBar>
      <AppDrawer
        toggleOpen={toggleDrawerState}
        isOpen={drawerState}
        employer={employer}
      />
      <div
        className={`${classes.fabContainer} ${!isLoading &&
          employees.length === 0 &&
          classes.grow}`}
      >
        <Fab
          color="default"
          aria-label="Add"
          component={LinkToEmployeeFormNew}
          className={`${classes.fab} ${!isLoading &&
            employees.length === 0 &&
            classes.fabGrow}`}
        >
          <AddIcon color="primary" className={classes.onTopOfGrow} />
        </Fab>
      </div>
      {isLoading && <CenteredSpinner />}
      {!isLoading && (
        <Fade in={!isLoading}>
          <div>
            {employees.length === 0 && (
              <NotFound icon="people" message={empty.ADD_EMPLOYEES} />
            )}
            {employees.length !== 0 && (
              <>
                <List className={classes.list}>
                  {employees.map(e => (
                    <EmployeeListItem
                      employee={e}
                      key={e.id}
                      onSecondaryAction={handleOpenMenu(e.id)}
                    />
                  ))}
                </List>
                <Menu
                  id="options-menu"
                  anchorEl={anchorEl}
                  open={!!anchorEl}
                  onClose={handleCloseMenu}
                >
                  <MenuItem onClick={handleCloseMenu} component={LinkToEmployeeFormEdit}>
                    Επεξεργασία
                  </MenuItem>
                  <MenuItem onClick={handleDelete}>Διαγραφή</MenuItem>
                  <Divider light variant="middle" />
                  <MenuItem onClick={handleCloseMenu} component={LinkToEmployeeInfo}>
                    <ListItemText primary="Μηνύματα" />
                    <ListItemIcon>
                      <LaunchIcon />
                    </ListItemIcon>
                  </MenuItem>
                </Menu>
              </>
            )}
          </div>
        </Fade>
      )}
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
        borderRadius: '50%',
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        animation: '0.4s alternate fabGrowAnimation ease-out infinite',
      },
    },
    onTopOfGrow: {
      zIndex: 1,
    },
    grow: {
      '&:before': {
        content: '""',
        position: 'absolute',
        zIndex: -1,
        borderRadius: '50%',
        width: '100%',
        height: '100%',
        backgroundColor: theme.palette.primary.main,
        animation: '1s alternate growAnimation ease-out infinite',
      },
    },
  });

export default withStyles(styles)(EmployeeList);
