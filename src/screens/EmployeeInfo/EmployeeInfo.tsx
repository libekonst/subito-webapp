import React, { FC } from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import EmployeeInfoHeader from './EmployeeInfoHeader';
import SmsList from './SmsList';
import { green } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/SaveAlt';
import SmsIcon from '@material-ui/icons/Sms';

const styles = (theme: any) =>
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
    grow: {
      flexGrow: 1,
    },
  });
interface IProps {
  classes: any;
}

const EmployeeInfo: FC<IProps> = props => {
  const { classes } = props;

  return (
    <>
      <EmployeeInfoHeader />
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

export default withStyles(styles)(EmployeeInfo);
