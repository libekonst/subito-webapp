import React, { FC } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/ChevronRight';
import PersonIcon from '@material-ui/icons/Person';
import { createStyles, withStyles } from '@material-ui/core';
import { IEmployee } from '../../interfaces/IEmployee';

const styles = (theme: any) => createStyles({});

interface IProps {
  classes: any;
  employee: IEmployee;
}
const EmployeeListItem: FC<IProps> = props => {
  const { employee } = props;
  const initial = employee.name.trimStart()[0];
  return (
    <ListItem button>
      <ListItemAvatar>
        <Avatar>{initial ? initial.toUpperCase() : <PersonIcon />}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={employee.name} secondary={employee.vat} />
      <ListItemSecondaryAction>
        <IconButton>
          <MoreIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default withStyles(styles)(EmployeeListItem);
