import React, { FC } from 'react';
import grey from '@material-ui/core/colors/blueGrey';
import MailIcon from '@material-ui/icons/Email';
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';
import SadFaceIcon from '@material-ui/icons/SentimentDissatisfied';
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

interface IProps extends WithStyles<typeof styles> {
  icon: 'message' | 'people' | 'person' | 'sadface';
  message?: string;
}
const EmptyList: FC<IProps> = props => {
  const { classes, icon, message } = props;

  function pickIcon() {
    switch (icon) {
      case 'message':
        return <MailIcon className={classes.icon} />;
      case 'people':
        return <PeopleIcon className={classes.icon} />;
      case 'sadface':
        return <SadFaceIcon className={classes.icon} />;
      default:
      case 'person':
        return <PersonIcon className={classes.icon} />;
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
