import React, { useState, ComponentProps } from 'react';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { IEmployee } from '../interfaces/IEmployee';
import { toUpperCaseInitial } from '../utils/getUpperCaseInitial';
import PersonIcon from '@material-ui/icons/Person';
import ExpandIcon from '@material-ui/icons/ExpandMore';

import Collapse from '@material-ui/core/Collapse';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { setHours, setMinutes, format } from 'date-fns';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';

interface IProps extends WithStyles<typeof styles> {
  employee?: IEmployee;
  goBack?: () => void;
  expanded?: boolean;
}

function ExpandableListTile(props: IProps & ComponentProps<typeof ListItem>) {
  const { employee, goBack, classes, expanded, ...rest } = props;
  const [isExpanded, setIsExpanded] = useState(expanded || false);
  const toggleExpand = () => setIsExpanded(!isExpanded);
  const employeeFiller: IEmployee = {
    name: 'Επιλέξτε υπάλληλο',
    vat: '000000000',
    workStart: setHours(setMinutes(new Date(), 0), 0),
    workFinish: setHours(setMinutes(new Date(), 0), 0),
  };

  const { name, vat, workStart, workFinish } = employee ? employee : employeeFiller;
  let initial;
  if (employee) initial = toUpperCaseInitial(employee.name);

  return (
    <div style={{ flex: 1 }}>
      <ListItem {...rest} onClick={toggleExpand}>
        <ListItemAvatar>
          <Avatar className={classes.primary}>{initial || <PersonIcon />}</Avatar>
        </ListItemAvatar>
        <div className={classes.panel}>
          <Typography className={classes.title}>{name}</Typography>
          <Collapse in={isExpanded} component={'span'}>
            <div>
              <Typography color="textSecondary">{`ΑΦΜ: ${vat}`}</Typography>
              <Typography color="textSecondary">
                {`${format(workStart, 'HH:mm')} - ${format(workFinish, 'HH:mm')}`}
              </Typography>
            </div>
          </Collapse>
        </div>
        <ListItemSecondaryAction>
          <IconButton onClick={toggleExpand}>
            <ExpandIcon
              color="action"
              className={`${classes.icon} ${isExpanded && classes.rotate}`}
            />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </div>
  );
}

const styles = (theme: any) =>
  createStyles({
    icon: {
      transition: 'transform 0.1s ease-out',
    },
    rotate: {
      transform: 'rotate(180deg)',
    },
    panel: {
      marginLeft: theme.spacing.unit * 2,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
    title: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    primary: {
      backgroundColor: theme.palette.primary.light,
    },
  });

export default withStyles(styles)(ExpandableListTile);
