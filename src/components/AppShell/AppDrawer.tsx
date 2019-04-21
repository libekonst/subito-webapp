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
import { routes } from '../../routes';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});
const LinkToSmsLog = (props: any) => <Link to={routes.SMS_LOG} {...props} />;
const LinkToEmployeeInfo = (props: any) => <Link to={routes.EMPLOYEE_INFO} {...props} />;
const LinkToEmployeeForm = (props: any) => <Link to={routes.EMPLOYEE_FORM} {...props} />;
const LinkToE8Form = (props: any) => <Link to={routes.E8FORM} {...props} />;
const LinkToEmployerForm = (props: any) => <Link to={routes.EMPLOYER_FORM} {...props} />;

interface IProps {
  toggleOpen: (e: any) => void;
  isOpen: boolean;
}
const AppDrawer: FC<IProps> = ({ isOpen, toggleOpen }) => {
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
    <SwipeableDrawer open={isOpen} onOpen={toggleOpen} onClose={toggleOpen}>
      <div tabIndex={0} role="button" onClick={toggleOpen} onKeyDown={toggleOpen}>
        {sideList}
      </div>
    </SwipeableDrawer>
  );
};

export default AppDrawer;
