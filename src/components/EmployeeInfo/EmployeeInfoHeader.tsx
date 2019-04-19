import React, { FC } from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EditIcon from '@material-ui/icons/Edit';

const styles = (theme: any) => createStyles({
  edit: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  empInfo: {
    paddingLeft: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit,
    paddingRight: theme.spacing.unit * 2,
    display: 'flex',
    justifyContent:'space-between'
  },
  grow: {
    flexGrow: 1,
  },
});
interface IProps extends WithStyles<typeof styles> {
  classes: any;
}

const EmployeeInfo: FC<IProps> = props => {
  const { classes } = props;

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton className={classes.menuButton} color="inherit" aria-label="Back">
          <ArrowBackIcon />
        </IconButton>
        <Typography align="left" variant="title" color="inherit" className={classes.grow}>
          Γιάννης Χιονίδης
        </Typography>
        <IconButton className={classes.menuButton} color="inherit" aria-label="Edit">
          <EditIcon />
        </IconButton>
      </Toolbar>
      <div className={classes.empInfo}>
        <Typography  color="inherit">
          ΑΦΜ: 105645916
        </Typography>
        <Typography  color="inherit" className={classes.pos}>
          8:00 - 16:00
        </Typography>
      </div>
    </AppBar>
  );
};

export default withStyles(styles)(EmployeeInfo);
