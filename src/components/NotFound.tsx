import React, { FC, ComponentProps } from 'react';
import grey from '@material-ui/core/colors/blueGrey';
import MailIcon from '@material-ui/icons/Email';
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';
import SadFaceIcon from '@material-ui/icons/SentimentDissatisfied';
import SettingsIcon from '@material-ui/icons/Settings';
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

interface IProps extends WithStyles<typeof styles> {
  icon: 'message' | 'people' | 'person' | 'sadface' | 'settings';
  message?: string;
}
const NotFound: FC<IProps & ComponentProps<typeof Typography>> = props => {
  const { classes, icon, message, children, ...rest } = props;

  function pickIcon() {
    switch (icon) {
      case 'message':
        return <MailIcon className={classes.icon} />;
      case 'people':
        return <PeopleIcon className={classes.icon} />;
      case 'sadface':
        return <SadFaceIcon className={classes.icon} />;
      case 'settings':
        return <SettingsIcon className={classes.icon} />;
      default:
      case 'person':
        return <PersonIcon className={classes.icon} />;
    }
  }
  return (
    <div className={classes.root}>
      {pickIcon()}
      <div className={classes.content}>
        {!!message && (
          <Typography variant="h5" className={classes.text} align="left" {...rest}>
            {message}
          </Typography>
        )}
        {!!children && <div className={classes.children}>{children}</div>}
      </div>
    </div>
  );
};

const styles = (theme: Theme) =>
  createStyles({
    icon: {
      color: grey[100],
      fontSize: theme.spacing.unit * 10,
    },
    text: {
      color: grey[300],
    },
    children: { marginTop: theme.spacing.unit * 3 },
    content: {
      display: 'flex',
      flexDirection: 'column',
      marginLeft: theme.spacing.unit,
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
export default withStyles(styles)(NotFound);
