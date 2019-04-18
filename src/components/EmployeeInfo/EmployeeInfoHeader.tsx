import React, { FC } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const styles = {
  edit: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  card: {
    minWidth: 275,
    borderRadius: 0,
    boxShadow: 'none',
  },
  pos: {
    marginTop: 12,
  },
};
interface IProps {
  classes: any;
}

const EmployeeInfo: FC<IProps> = props => {
  const { classes } = props;

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton className={classes.menuButton} color="inherit" aria-label="Cancel">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="title" color="inherit" className={classes.grow}>
          Γιάννης Χιονίδης
        </Typography>
      </Toolbar>
      <Card className={classes.card}>
        <CardContent>
          <Typography align="left">ΑΦΜ: 105645916</Typography>
          <Typography align="left" className={classes.pos} color="textSecondary">
            Ωράριο: 8:00 - 16:00
          </Typography>
        </CardContent>
        <CardActions className={classes.edit}>
          <Button size="small" color="primary">
            Επεξεργασια
          </Button>
        </CardActions>
      </Card>
    </AppBar>
  );
};

export default withStyles(styles)(EmployeeInfo);
