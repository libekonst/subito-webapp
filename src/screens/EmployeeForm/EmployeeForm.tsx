import React, { FC, useState } from 'react';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { addHours, setHours, setMinutes } from 'date-fns';
import WorkHourPicker from '../../components/WorkHourPicker';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import AccountIcon from '@material-ui/icons/AccountCircle';
import WorkIcon from '@material-ui/icons/Work';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { stickyTopWithAppbar } from '../../styles/mixins';

interface IProps extends WithStyles<typeof styles> {}
const EmployeeForm: FC<IProps> = props => {
  const variant = 'standard';
  const { classes } = props;
  const date: Date = setMinutes(setHours(new Date(), 8), 0);
  const [workStart, handleWorkStartChange] = useState(date);
  const [workFinish, handleWorkFinishChange] = useState(addHours(workStart, 8));
  return (
    <>
      <List
        className={classes.list}
        subheader={
          <ListSubheader color="primary" className={classes.listHeader}>
            Στοιχεία υπαλλήλου
          </ListSubheader>
        }
      >
        <ListItem key="employee-name">
          <ListItemIcon>
            <AccountIcon />
          </ListItemIcon>
          <TextField
            variant={variant}
            label="Όνοματεπώνυμο"
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
        <ListItem key="employee-workHours">
          <WorkHourPicker
            selectedDateStart={workStart}
            selectedDateFinish={workFinish}
            handleDateStartChange={handleWorkStartChange}
            handleDateFinishChange={handleWorkFinishChange}
          />
        </ListItem>
      </List>
    </>
    // <div className={classes.content}>
    //   <TextField
    //     label="Ονοματεπώνυμο"
    //     fullWidth
    //     margin="normal"
    //     InputProps={{
    //       endAdornment: (
    //         <InputAdornment position="start">
    //           <PersonIcon />
    //         </InputAdornment>
    //       ),
    //     }}
    //   />
    //   <TextField
    //     label="ΑΦΜ"
    //     fullWidth
    //     margin="normal"
    //     type="tel"
    //     InputProps={{
    //       endAdornment: (
    //         <InputAdornment position="start">
    //           <WorkIcon />
    //         </InputAdornment>
    //       ),
    //     }}
    //   />
    //   <WorkHourPicker
    //     title="Ωράριο Εργασίας"
    //     selectedDateStart={workStart}
    //     selectedDateFinish={workFinish}
    //     handleDateStartChange={handleWorkStartChange}
    //     handleDateFinishChange={handleWorkFinishChange}
    //   />
    // </div>
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
