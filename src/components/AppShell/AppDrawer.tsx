import React, { FC } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link } from 'react-router-dom';
import { routes } from '../../routes';
import { withRouter, RouteComponentProps } from 'react-router';
import DrawerItem from './DrawerItem';
import Typography from '@material-ui/core/Typography';
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles';

const LinkToSmsLog = (props: any) => <Link to={routes.SMS_LOG} {...props} />;
const LinkToEmployeeInfo = (props: any) => <Link to={routes.EMPLOYEE_INFO} {...props} />;
const LinkToEmployeeForm = (props: any) => <Link to={routes.EMPLOYEE_FORM} {...props} />;
const LinkToEmployeeList = (props: any) => <Link to={routes.EMPLOYEE_LIST} {...props} />;
const LinkToE8Form = (props: any) => <Link to={routes.E8FORM} {...props} />;
const LinkToEmployerForm = (props: any) => <Link to={routes.EMPLOYER_FORM} {...props} />;

interface IProps extends WithStyles<typeof styles> {
  toggleOpen: (e: any) => void;
  isOpen: boolean;
}
const AppDrawer: FC<IProps & RouteComponentProps> = props => {
  const { isOpen, toggleOpen, location, classes } = props;

  const empListSelected = location.pathname === routes.EMPLOYEE_LIST;
  const selectedProps = { color: 'primary', style: { fontWeight: 550 } };
  const sideList = (
    <div className={classes.list}>
      <Typography variant="h4" noWrap color="primary" className={classes.subitoTitle}>
        Subito E8
      </Typography>
      {/* <Divider light /> */}
      <ListItem className={classes.employerListTile}>
        {/* <ListItemAvatar>
          <Avatar>{<PersonIcon />}</Avatar>
        </ListItemAvatar> */}
        <ListItemText primary="Employer Name" secondary="ΑΦΜ: 2938471739" />
      </ListItem>
      <Divider light />

      <List
        component="nav"
        subheader={
          <ListSubheader disableSticky component="div">
            Πλοήγηση
          </ListSubheader>
        }
      >
        <DrawerItem
          selected={location.pathname === routes.EMPLOYEE_LIST}
          component={LinkToEmployeeList}
          itemText="Υπάλληλοι"
          icon="people"
        />
        <DrawerItem
          selected={location.pathname === routes.SMS_LOG}
          component={LinkToSmsLog}
          itemText="Μηνύματα"
          icon="messages"
        />
        {/* <Divider light variant="middle" /> */}

        <ListItem button component={LinkToEmployerForm}>
          <ListItemIcon>
            <SettingsIcon color="inherit" />
          </ListItemIcon>
          <ListItemText primary="Ρυθμίσεις" />
        </ListItem>
      </List>

      <List
        component="nav"
        subheader={
          <ListSubheader disableSticky component="div">
            Πληροφορίες
          </ListSubheader>
        }
      >
        {/* <Divider /> */}

        <ListItem button component={LinkToEmployeeInfo}>
          <ListItemText primary="EmployeeInfo" />
        </ListItem>
        <ListItem button component={LinkToEmployeeForm}>
          <ListItemText primary="EmployeeForm" />
        </ListItem>
        <ListItem button component={LinkToE8Form}>
          <ListItemText primary="E8Form" />
        </ListItem>
      </List>
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

const styles = (theme: Theme) =>
  createStyles({
    list: {
      width: 250,
    },
    title: {
      color: theme.palette.text.primary,
      // color: theme.palette.primary.main,
    },
    employerListTile: {
      // marginTop: theme.spacing.unit,
      // marginBottom: theme.spacing.unit,
    },
    subitoTitle: {
      marginLeft: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit,
      marginTop: theme.spacing.unit * 2,
    },
    header: {
      // Styles
      width: '100%',
      height: '130px',
      // backgroundColor: theme.palette.primary.main,
      padding: theme.spacing.unit,

      // Flex
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
    },
  });

export default withStyles(styles)(withRouter(AppDrawer));
