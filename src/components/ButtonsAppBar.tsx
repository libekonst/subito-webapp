import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

interface IProps {
  classes: any;
  title: string;
}
const ButtonAppBar: FC<IProps> = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Cancel">
            <ClearIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.grow}>
            {props.title}
          </Typography>
          <IconButton color="inherit" aria-label="Save">
            <DoneIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withStyles(styles)(ButtonAppBar);
