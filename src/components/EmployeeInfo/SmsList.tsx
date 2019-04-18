import React, { FC } from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import SmsIcon from '@material-ui/icons/Sms';
import { format } from 'date-fns';

const styles = {
  edit: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  card: {
    minWidth: 275,
    borderRadius: 0,
    boxShadow: 'none',
  },
  pos: {
    marginTop: 12,
  },
};
interface IProps {
  classes: any;
}
function generate(element: any) {
  return [0, 1, 2,3,4,5,6,7,8,9,10,11,12,13].map(value =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

const EmployeeInfo: FC<IProps> = props => {
  const { classes } = props;

  return (
    <List>
      {generate(
        <ListItem button>
          <ListItemAvatar>
            <Avatar>
              <SmsIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={format(new Date(), "dd/MM/yyyy  HH:mm")} secondary="16:00 - 17:30" />
        </ListItem>,
      )}
    </List>
  );
};

export default withStyles(styles)(EmployeeInfo);
