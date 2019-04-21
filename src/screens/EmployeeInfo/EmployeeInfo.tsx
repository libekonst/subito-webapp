import React, { FC } from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import SmsList from './SmsList';
import { green } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/SaveAlt';
import SmsIcon from '@material-ui/icons/Sms';

interface IProps extends WithStyles<typeof styles> {
  history?: any;
  classes: any;
}

const EmployeeInfo: FC<IProps> = props => {
  const { classes } = props;

  return (
    <>
      <SmsList />
      <Fab className={classes.fabCSV}>
        <SaveIcon />
      </Fab>
      <Fab className={classes.fabSMS} color="primary">
        <SmsIcon />
      </Fab>
    </>
  );
};

const styles = (theme: Theme) =>
  createStyles({
    fabCSV: {
      position: 'fixed',
      bottom: theme.spacing.unit * 12,
      right: theme.spacing.unit * 3,
      color: theme.palette.common.white,
      backgroundColor: green[800],
      '&:hover': {
        backgroundColor: green[900],
      },
    },
    fabSMS: {
      position: 'fixed',
      bottom: theme.spacing.unit * 4,
      right: theme.spacing.unit * 3,
    },
  });

export default withStyles(styles)(EmployeeInfo);
