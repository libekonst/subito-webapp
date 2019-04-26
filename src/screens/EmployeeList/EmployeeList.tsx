import React, { FC, useState } from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import EmployeeListItem from './EmployeeListItem';
import { IEmployee } from '../../interfaces/IEmployee';
import IconButton from '@material-ui/core/IconButton';
import BackupIcon from '@material-ui/icons/Backup';
import { AppBar, DrawerToolbar, AppDrawer } from '../../components/AppShell';

interface IProps extends WithStyles<typeof styles> {
  classes: any;
  employees: IEmployee[];
}
const EmployeeList: FC<IProps> = props => {
  const { classes, employees } = props;

  const [drawerState, setDrawerState] = useState(false);
  const toggleDrawerState = () => setDrawerState(!drawerState);

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

      <List className={classes.list}>
        {employees.map(e => (
          <EmployeeListItem employee={e} key={e.vat} />
        ))}
      </List>
    </>
  );
};

const styles = () =>
  createStyles({
    list: {
      width: '100%',
      margin: 'auto',
    },
  });

export default withStyles(styles)(EmployeeList);
