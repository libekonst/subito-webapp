import React, { FC } from 'react';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import SmsList from '../EmployeeInfo/SmsList';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { green } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/SaveAlt';
import SmsIcon from '@material-ui/icons/Sms';
import { Link } from 'react-router-dom';

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

    grow: {
      flexGrow: 1,
    },
  });

interface IProps extends WithStyles<typeof styles> {
  history: any;
}

const SmsLog: FC<IProps> = props => {
  const { classes, history } = props;
  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton color="inherit" aria-label="Back" onClick={history.goBack}>
            <ArrowBackIcon />
          </IconButton>
          <Typography
            align="left"
            variant="title"
            color="inherit"
            className={classes.grow}
          >
            Λίστα Sms
          </Typography>
        </Toolbar>
      </AppBar>
      <SmsList />
      <Fab className={classes.fabCSV}>
        <SaveIcon />
      </Fab>
    </>
  );
};

export default withStyles(styles)(SmsLog);
