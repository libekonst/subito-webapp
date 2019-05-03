import React, { FC } from 'react';
import grey from '@material-ui/core/colors/blueGrey';
import MailIcon from '@material-ui/icons/Email';
import PeopleIcon from '@material-ui/icons/People';
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

interface IProps extends WithStyles<typeof styles> {
  icon: 'message' | 'people';
  message?: string;
}
const EmptyList: FC<IProps> = props => {
  const { classes, icon, message } = props;
  const noSmsEmployee = (
    <>
      <MailIcon className={classes.icon} />
      <Typography variant="h5" className={classes.text}>
        Δεν βρέθηκαν μηνύματα για αυτόν τον υπάλληλο.
      </Typography>
    </>
  );
  const noSms = (
    <>
      <MailIcon className={classes.icon} />
      <Typography variant="h5" className={classes.text}>
        Δεν βρέθηκαν μηνύματα.
      </Typography>
    </>
  );
  function pickIcon() {
    switch (icon) {
      case 'message':
        return <MailIcon className={classes.icon} />;
      default:
      case 'people':
        return <PeopleIcon className={classes.icon} />;
    }
  }
  return (
    <div className={classes.root}>
      {pickIcon()}
      <Typography variant="h5" className={classes.text} align="left">
        {message}
      </Typography>
    </div>
  );
};

const styles = (theme: Theme) =>
  createStyles({
    icon: {
      color: grey[100],
      fontSize: theme.spacing.unit * 10,
      marginRight: theme.spacing.unit * 3,
    },
    text: {
      color: grey[300],
    },
    root: {
      width: '100%',
      height: '70vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing.unit * 2,
    },
  });
export default withStyles(styles)(EmptyList);
