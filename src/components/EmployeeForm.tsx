import React, { FC, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import WorkIcon from '@material-ui/icons/Work';
import ButtonsAppBar from './ButtonsAppBar';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { TimePicker } from 'material-ui-pickers';
import { format, addHours, setHours } from 'date-fns';
import WorkHourPicker from './WorkHourPicker';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    width: '100%',
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
  const [workStart, handleWorkStartChange] = useState(setHours(new Date(), 8));
  const [workFinish, handleWorkFinishChange] = useState(addHours(workStart, 8));
  return (
    <div>
      <ButtonsAppBar title="Αποθήκευση υπαλλήλου" />
      <TextField
        className={classes.margin}
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
        className={classes.margin}
        label="ΑΦΜ"
        fullWidth
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <WorkIcon />
            </InputAdornment>
          ),
        }}
      />
      <WorkHourPicker
        selectedDateStart={workStart}
        selectedDateFinish={workFinish}
        handleDateStartChange={handleWorkStartChange}
        handleDateFinishChange={handleWorkFinishChange}
      />
      {/* {format(selectedDate, 'HHmm')} */}
    </div>
  );
};

export default withStyles(styles)(EmployeeForm);
