import React, { FC } from 'react';
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles';
import ArrowFwDIcon from '@material-ui/icons/ArrowForward';
import { TimePicker } from 'material-ui-pickers';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

interface IProps extends WithStyles<typeof styles> {
  title?: string;
  selectedDateStart: Date;
  handleDateStartChange: React.Dispatch<React.SetStateAction<Date>>;
  selectedDateFinish: Date;
  handleDateFinishChange: React.Dispatch<React.SetStateAction<Date>>;
}
const WorkHourPicker: FC<IProps> = props => {
  const {
    classes,
    title,
    selectedDateStart,
    handleDateStartChange,
    selectedDateFinish,
    handleDateFinishChange,
  } = props;

  return (
    <div className={classes.root}>
      {title ? <Typography>{title}</Typography> : undefined}
      <div className={classes.timeWrapper}>
        <TimePicker
          showTodayButton
          todayLabel="now"
          label="Έναρξη"
          ampm={false}
          value={selectedDateStart}
          minutesStep={5}
          onChange={handleDateStartChange}
          margin="normal"
          InputProps={{ className: classes.timeInput }}
        />
        <ArrowFwDIcon className={classes.timeArrow} />
        <TimePicker
          showTodayButton
          todayLabel="now"
          label="Λήξη"
          ampm={false}
          value={selectedDateFinish}
          minutesStep={5}
          onChange={handleDateFinishChange}
          margin="normal"
          InputProps={{ className: classes.timeInput }}
        />
      </div>
    </div>
  );
};

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: 10,
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

export default withStyles(styles)(WorkHourPicker);
