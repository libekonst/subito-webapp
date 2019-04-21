import React, { FC } from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/ChevronRight';
import BackupIcon from '@material-ui/icons/Backup';
import EmployeeListItem from './EmployeeListItem';
import { IEmployee } from '../../interfaces/IEmployee';

const styles = (theme: any) =>
  createStyles({
    list: {
      width: '100%',
      maxWidth: 600,
      margin: 'auto',
      backgroundColor: theme.palette.background.paper,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
  });

interface IProps {
  classes: any;
  openDrawer?: (e: any) => void;
  employees: IEmployee[];
}
const EmployeeList: FC<IProps> = props => {
  const { classes, employees, openDrawer } = props;

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            onClick={openDrawer}
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow} align="left">
            Υπάλληλοι
          </Typography>
          <IconButton color="inherit">
            <BackupIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <List className={classes.list}>
        {employees.map(e => (
          <EmployeeListItem employee={e} />
        ))}
      </List>
    </div>
  );
};

export default withStyles(styles)(EmployeeList);
