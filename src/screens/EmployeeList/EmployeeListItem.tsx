import React, { FC, useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import PersonIcon from '@material-ui/icons/Person';
import { createStyles, withStyles } from '@material-ui/core';
import { IEmployee } from '../../interfaces/IEmployee';
import { toUpperCaseInitial } from '../../utils/getUpperCaseInitial';
import { Link } from 'react-router-dom';
import { routes } from '../../routes';

const styles = (theme: any) =>
  createStyles({
    blue: {
      backgroundColor: theme.palette.primary.light,
    },
  });

interface IProps {
  classes: any;
  employee: IEmployee;
  onSecondaryAction?: (e: any) => void;
}
const EmployeeListItem: FC<IProps> = props => {
  const { employee, onSecondaryAction, classes } = props;
  const initial = toUpperCaseInitial(employee.name);

  
  const EmployeeE8Link = (props: any) => (
    <Link {...props} to={`${routes.E8FORM}/${employee.id}`} />
  );

  return (
    <ListItem button component={EmployeeE8Link}>
      <ListItemAvatar>
        <Avatar className={classes.blue}>{initial || <PersonIcon />}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={employee.name} secondary={employee.vat} />
      <ListItemSecondaryAction>
        <IconButton
          aria-owns={"Μενού επιλογών"}
          aria-haspopup="true"
          onClick={onSecondaryAction}
        >
          <MoreIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default withStyles(styles)(EmployeeListItem);
