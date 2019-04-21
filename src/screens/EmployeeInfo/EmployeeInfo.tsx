import React, { FC } from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import SmsList from './SmsList';
import { green } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/SaveAlt';
import SmsIcon from '@material-ui/icons/Sms';
import { IE8Sms } from '../../interfaces/IE8Sms';

interface IProps extends WithStyles<typeof styles> {
  history?: any;
  classes: any;
}

const EmployeeInfo: FC<IProps> = props => {
  const { classes } = props;
  const smsFactory = (approved: boolean) => ({
    employee: {
      name: 'Γιάννης Χιονίδης',
      vat: '104957382',
      workStart: '08:00',
      workFinish: '14:00',
    },
    overtimeStart: '14:00',
    overtimeFinish: '15:00',
    dateSent: new Date(),
    approved: true,
  });
  const list: IE8Sms[] = Array(30).fill(smsFactory(Math.random() >= 0.5));


  return (
    <main className={classes.main}>
      <SmsList smsList={list} />
      <Fab className={classes.fabCSV}>
        <SaveIcon />
      </Fab>
      <Fab className={classes.fabSMS} color="primary">
        <SmsIcon />
      </Fab>
    </main>
  );
};

const styles = (theme: Theme) =>
  createStyles({
    main: {
      paddingBottom: theme.spacing.unit * 20,
    },
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
