import React, { FC, useState } from 'react';
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import WorkIcon from '@material-ui/icons/Work';
import ButtonsAppBar from './ButtonsAppBar';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { TimePicker } from 'material-ui-pickers';
import { format, addHours, setHours, setMinutes } from 'date-fns';
import WorkHourPicker from '../../components/WorkHourPicker';
import { stickyTopWithAppbar } from '../../styles/mixins';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import AccountIcon from '@material-ui/icons/AccountCircle';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

interface IProps extends WithStyles<typeof styles> {}
const EmployeeForm: FC<IProps> = props => {
  const { classes } = props;
  const variant = 'standard';
  const date: Date = setMinutes(setHours(new Date(), 8), 0);
  const [workStart, handleWorkStartChange] = useState(date);
  const [workFinish, handleWorkFinishChange] = useState(addHours(workStart, 8));
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
            selectedDateStart={workStart}
            selectedDateFinish={workFinish}
            handleDateStartChange={handleWorkStartChange}
            handleDateFinishChange={handleWorkFinishChange}
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
    infoTileWrapper: {
      paddingLeft: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
    },
    infoTile: {
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.spacing.unit,
    },
  });

export default withStyles(styles)(EmployeeForm);
