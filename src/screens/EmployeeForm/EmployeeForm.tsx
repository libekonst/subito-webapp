import React, { FC, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import WorkIcon from '@material-ui/icons/Work';
import ButtonsAppBar from './ButtonsAppBar';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { TimePicker } from 'material-ui-pickers';
import { format, addHours, setHours, setMinutes } from 'date-fns';
import WorkHourPicker from '../../components/WorkHourPicker';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    width: '100%',
  },
  content: {
    padding: 16,
  },
  // margin: {
  //   marginTop: 20,
  // },
};

interface IProps {
  classes: any;
}
const EmployeeForm: FC<IProps> = props => {
  const { classes } = props;
  const date: Date = setMinutes(setHours(new Date(), 8), 0);
  const [workStart, handleWorkStartChange] = useState(date);
  const [workFinish, handleWorkFinishChange] = useState(addHours(workStart, 8));
  return (
    <div className={classes.content}>
      <TextField
        label="Ονοματεπώνυμο"
        fullWidth
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <PersonIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="ΑΦΜ"
        fullWidth
        margin="normal"
        type="tel"
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <WorkIcon />
            </InputAdornment>
          ),
        }}
      />
      <WorkHourPicker
        title="Ωράριο Εργασίας"
        selectedDateStart={workStart}
        selectedDateFinish={workFinish}
        handleDateStartChange={handleWorkStartChange}
        handleDateFinishChange={handleWorkFinishChange}
      />
    </div>
  );
};

export default withStyles(styles)(EmployeeForm);
