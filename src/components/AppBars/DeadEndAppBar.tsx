import React, { FC } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

interface IProps extends WithStyles<typeof styles> {
  history?: any;
  pageTitle: string;
}
const DeadEndAppBar: FC<IProps> = props => {
  const { history, pageTitle, classes } = props;
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          className={classes.appBarButton}
          color="inherit"
          aria-label="Go Back"
          onClick={history.goBack}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" className={classes.pageTitle}>
          {pageTitle}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

const styles = () =>
  createStyles({
    pageTitle: {
      flex: 1,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
    appBarButton: {
      marginLeft: -12,
      marginRight: 20,
    },
  });

export default withStyles(styles)(DeadEndAppBar);
