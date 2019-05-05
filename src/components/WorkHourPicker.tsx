import React, { FC } from 'react';
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles';
import ArrowFwDIcon from '@material-ui/icons/ArrowForward';
import { TimePicker } from 'material-ui-pickers';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

interface IProps extends WithStyles<typeof styles> {
  valueStart: Date;
  onChangeStart: (date: Date) => any;
  valueFinish: Date;
  onChangeFinish: (date: Date) => any;
  labelStart?: React.ReactNode;
  errorLabelStart?: React.ReactNode;
  labelFinish?: React.ReactNode;
  errorLabelFinish?: React.ReactNode;
  errorStart?: boolean;
  errorFinish?: boolean;
}
const WorkHourPicker: FC<IProps> = props => {
  const {
    classes,
    valueStart,
    valueFinish,
    onChangeStart,
    onChangeFinish,
    errorStart,
    errorFinish,
    labelStart,
    errorLabelStart,
    labelFinish,
    errorLabelFinish,
  } = props;

  return (
    <div className={classes.timeWrapper}>
      <TimePicker
        label={errorLabelStart || labelStart}
        error={errorStart}
        value={valueStart}
        showTodayButton
        onChange={onChangeStart}
        todayLabel="now"
        ampm={false}
        minutesStep={5}
        margin="normal"
        InputProps={{ className: classes.timeInput }}
      />
      <ArrowFwDIcon className={classes.timeArrow} />
      <TimePicker
        label={errorLabelFinish || labelFinish}
        error={errorFinish}
        value={valueFinish}
        onChange={onChangeFinish}
        showTodayButton
        todayLabel="now"
        ampm={false}
        minutesStep={5}
        margin="normal"
        InputProps={{ className: classes.timeInput }}
      />
    </div>
  );
};

const styles = (theme: Theme) =>
  createStyles({
    timeWrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyItems: 'space-between',
      flexGrow: 1,
      padding: 10,
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
