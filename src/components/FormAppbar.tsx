import React, { FC, Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';

interface IProps extends WithStyles<typeof styles> {
  onSubmit: (e: any) => void;
  onCancel: (e: any) => void;
  pageTitle: string;
}

const FormAppbar: FC<IProps> = props => {
  const { onSubmit, onCancel, pageTitle, classes } = props;
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton onClick={onCancel} color="inherit" aria-label="Άκυρο" title="Άκυρο">
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" className={classes.pageTitle}>
          {pageTitle}
        </Typography>
        <IconButton
          onClick={onSubmit}
          color="inherit"
          aria-label="Αποθήκευση"
          title="Αποθήκευση"
        >
          <CheckIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

const styles = (theme: any) =>
  createStyles({
    pageTitle: {
      flex: 1,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
  });

export default withStyles(styles)(FormAppbar);
