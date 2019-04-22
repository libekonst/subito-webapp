import React, { FC } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import SmsIcon from '@material-ui/icons/Sms';
import { format } from 'date-fns';
import { IE8Sms } from '../interfaces/IE8Sms';
import ErrorIcon from '@material-ui/icons/Error';

interface IProps extends WithStyles<typeof styles> {
  smsList?: IE8Sms[];
}

const EmployeeInfo: FC<IProps> = props => {
  const { smsList } = props;

  return (
    <List>
      {smsList &&
        smsList.map(sms => (
          <ListItem button>
            <ListItemAvatar>
              {sms.approved ? <SmsIcon color="primary" /> : <ErrorIcon color="error" />}
            </ListItemAvatar>
            <ListItemText
              primary={
                format(sms.dateSent, 'dd/MM/yyyy') +
                `  [${sms.overtimeStart} - ${sms.overtimeFinish}]`
              }
              secondary={sms.employee.name}
            />
          </ListItem>
        ))}
    </List>
  );
};

const styles = {
  aproved: {
    color: 'green',
  },
  declined: {
    color: 'orange',
  },
};

export default withStyles(styles)(EmployeeInfo);
