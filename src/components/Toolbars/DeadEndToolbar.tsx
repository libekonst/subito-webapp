import React, { FC } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PageTitle from './PageTitle';

interface IProps extends WithStyles<typeof styles> {
  history?: any;
  pageTitle: string;
}
const DeadEndToolbar: FC<IProps> = props => {
  const { history, pageTitle, classes } = props;
  return (
    <Toolbar>
      <IconButton
        className={classes.leftButton}
        color="inherit"
        aria-label="Go Back"
        onClick={history && history.goBack}
      >
        <ArrowBackIcon />
      </IconButton>
      <PageTitle pageTitle={pageTitle} />
    </Toolbar>
  );
};

const styles = () =>
  createStyles({
    leftButton: {
      marginLeft: -12,
      marginRight: 20,
    },
  });

export default withStyles(styles)(DeadEndToolbar);
