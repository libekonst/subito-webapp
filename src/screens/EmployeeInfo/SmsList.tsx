import React, { FC } from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import SmsIcon from '@material-ui/icons/Sms';
import { format } from 'date-fns';
import { IE8Sms } from '../../interfaces/IE8Sms';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import CheckIcon from '@material-ui/icons/Done';
import ErrorIcon from '@material-ui/icons/Error';

const styles = {
  aproved: {},
  declined: {},
};
interface IProps {
  classes: any;
  smsList?: IE8Sms[];
}

const EmployeeInfo: FC<IProps> = props => {
  const { classes, smsList } = props;

  return (
    <List>
      {smsList &&
        smsList.length &&
        smsList.map(sms => (
          <ListItem button>
            <ListItemAvatar>
              <Avatar>
                <SmsIcon /* className={sms.approved ? classes.aproved : classes.declined} */
                />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                format(sms.dateSent, 'dd/MM/yyyy') +
                `  [${sms.overtimeStart} - ${sms.overtimeFinish}]`
              }
              secondary={sms.employee.name}
            />
            <ListItemSecondaryAction>
              {/* {sms.approved ? <CheckIcon color="primary"/> : <ErrorIcon color="error" />}  */}
            </ListItemSecondaryAction>
          </ListItem>
        ))}
    </List>
  );
};

export default withStyles(styles)(EmployeeInfo);
