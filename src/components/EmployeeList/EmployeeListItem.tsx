import React, { FC } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/ChevronRight';
import { createStyles, withStyles } from '@material-ui/core';

const styles = (theme: any) => createStyles({});

interface IProps {
  classes: any;
}
const EmployeeListItem: FC<IProps> = props => {
  return (
    <ListItem button>
      <ListItemAvatar>
        <Avatar>ΤΔ</Avatar>
      </ListItemAvatar>
      <ListItemText primary="Ταργκαρίδη Δανάη" secondary="105382465" />
      <ListItemSecondaryAction>
        <IconButton>
          <MoreIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default withStyles(styles)(EmployeeListItem);
