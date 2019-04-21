import React, { FC } from 'react';
import { makeStyles } from '@material-ui/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});
const LinkToSmsLog = (props: any) => <Link to="/smsLog" {...props} />;
const LinkToEmployeeInfo = (props: any) => <Link to="/employeeInfo" {...props} />;
const LinkToEmployeeForm = (props: any) => <Link to="/employeeForm" {...props} />;
const LinkToE8Form = (props: any) => <Link to="/e8Form" {...props} />;
const LinkToEmployerForm = (props: any) => <Link to="/employerForm" {...props} />;


interface IProps {
  toggleDrawerState: () => void;
  drawerState: boolean;
}
const DrawerApp: FC<IProps> = ({ drawerState, toggleDrawerState }) => {
  
  const classes = useStyles();

  const sideList = (
    <div className={classes.list}>
      <List>
        <ListItem button component={LinkToSmsLog}>
          <ListItemText primary="SmsLog" />
        </ListItem>
        <ListItem button component={LinkToEmployeeInfo}>
          <ListItemText primary="EmployeeInfo" />
        </ListItem>
        <ListItem button component={LinkToEmployeeForm}>
          <ListItemText primary="EmployeeForm" />
        </ListItem>
        <ListItem button component={LinkToE8Form}>
          <ListItemText primary="E8Form" />
        </ListItem>
        <ListItem button component={LinkToEmployerForm}>
          <ListItemText primary="EmployerForm" />
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  return (
    <SwipeableDrawer
      open={drawerState}
      onOpen={toggleDrawerState}
      onClose={toggleDrawerState}
    >
      <div
        tabIndex={0}
        role="button"
        onClick={toggleDrawerState}
        onKeyDown={toggleDrawerState}
      >
        {sideList}
      </div>
    </SwipeableDrawer>
  );
};

export default DrawerApp;
