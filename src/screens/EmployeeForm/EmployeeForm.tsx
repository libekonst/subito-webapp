import React, { FC, useState } from 'react';
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles';
import WorkIcon from '@material-ui/icons/Work';
import TextField from '@material-ui/core/TextField';
import { TimePicker } from 'material-ui-pickers';
import { format, addHours, setHours, setMinutes } from 'date-fns';
import { stickyTopWithAppbar } from '../../styles/mixins';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import AccountIcon from '@material-ui/icons/AccountCircle';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ArrowFwDIcon from '@material-ui/icons/ArrowForward';
import WorkHourPicker from '../../components/WorkHourPicker';

interface IProps extends WithStyles<typeof styles> {}
const EmployeeForm: FC<IProps> = props => {
  const { classes } = props;
  const variant = 'standard';

  const date: Date = setMinutes(setHours(new Date(), 8), 0);

  const [workStart, setWorkStart] = useState(date);
  const [workFinish, setWorkFinish] = useState(addHours(workStart, 8));

  function handleWorkStart(e:any){
    
  }
  return (
    <>
      <List
        className={classes.list}
        subheader={
          <ListSubheader color="primary" className={classes.listHeader}>
            Στοιχεία Υπαλλήλου
          </ListSubheader>
        }
      >
        <ListItem key="employee-fullname">
          <ListItemIcon>
            <AccountIcon />
          </ListItemIcon>
          <TextField
            variant={variant}
            label="Ονοματεπώνυμο"
            className={classes.textField}
          />
        </ListItem>
        <ListItem key="employee-vat">
          <ListItemIcon>
            <WorkIcon />
          </ListItemIcon>
          <TextField
            variant={variant}
            type="tel"
            label="ΑΦΜ"
            className={classes.textField}
          />
        </ListItem>
      </List>
      <List
        className={classes.list}
        subheader={
          <ListSubheader color="primary" className={classes.listHeader}>
            Τυπικό ωράριο εργασίας
          </ListSubheader>
        }
      >
        <ListItem key="WorkHour">
          <WorkHourPicker
            valueStart={workStart}
            valueFinish={workFinish}
            onChangeStart={setWorkStart}
            onChangeFinish={setWorkFinish}
          />
        </ListItem>
      </List>
    </>
  );
};

const styles = (theme: Theme) =>
  createStyles({
    list: {
      width: '100%',
      maxWidth: 600,
      '&:not(:first-child)': {
        marginTop: '2rem',
      },
    },
    listHeader: {
      backgroundColor: theme.palette.background.default,
      ...stickyTopWithAppbar,
    },
    textField: {
      width: '100%',
    },
    timeWrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyItems: 'space-between',
      flexGrow: 1,
      padding: 5,
    },
    timeInput: {
      textAlign: 'center',
      minWidth: 0,
    },
    timeArrow: {
      marginTop: 35,
      marginLeft: 20,
      marginRight: 20,
    },
  });

export default withStyles(styles)(EmployeeForm);
