import React, { FC, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import ArrowFwDIcon from '@material-ui/icons/ArrowForward';
import { TimePicker } from 'material-ui-pickers';
import { format } from 'date-fns';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

const styles = {
  root: {
    flexGrow: 1,
    margin:10,
    padding: 15,
  },
  grow: {
    width: '100%',
  },
  margin: {
    margin: 1,
  },
};

interface IProps {
  classes: any;
  selectedDateStart: Date;
  handleDateStartChange: React.Dispatch<React.SetStateAction<Date>>;
  selectedDateFinish: Date;
  handleDateFinishChange: React.Dispatch<React.SetStateAction<Date>>;
}
const WorkHourPicker: FC<IProps> = props => {
  const {
    classes,
    selectedDateStart,
    handleDateStartChange,
    selectedDateFinish,
    handleDateFinishChange,
  } = props;
  return (
    <div className={classes.root}>
    <Typography>Ωράριο εργασίας</Typography>
      <Grid container wrap="nowrap" spacing={32} justify='space-between'>
        <Grid item wrap="nowrap">
          <TimePicker
            showTodayButton
            todayLabel="now"
            label="Έναρξη"
            ampm={false}
            value={selectedDateStart}
            minutesStep={5}
            onChange={handleDateStartChange}
            margin="normal"
          />
        </Grid>
        <Grid item justify="center"  >
          <ArrowFwDIcon style={{marginTop:35}}/>
        </Grid>
        <Grid item>
          <TimePicker
            showTodayButton
            todayLabel="now"
            label="Λήξη"
            ampm={false}
            value={selectedDateFinish}
            minutesStep={5}
            onChange={handleDateFinishChange}
            margin="normal"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(WorkHourPicker);
