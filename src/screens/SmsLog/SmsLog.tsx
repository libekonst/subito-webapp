import React, { FC } from 'react';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import SmsList from '../EmployeeInfo/SmsList';
import { green } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/SaveAlt';

interface IProps extends WithStyles<typeof styles> {
  history: any;
}

const SmsLog: FC<IProps> = props => {
  const { classes } = props;
  return (
    <>
      <SmsList />
      <Fab className={classes.fabCSV}>
        <SaveIcon />
      </Fab>
    </>
  );
};

const styles = (theme: Theme) =>
  createStyles({
    fabCSV: {
      position: 'fixed',
      bottom: theme.spacing.unit * 4,
      right: theme.spacing.unit * 3,
      color: theme.palette.common.white,
      backgroundColor: green[800],
      '&:hover': {
        backgroundColor: green[900],
      },
    },
  });

export default withStyles(styles)(SmsLog);
