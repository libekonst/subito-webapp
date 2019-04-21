import React, { FC, Component } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PageTitle from './PageTitle';

interface IProps extends WithStyles<typeof styles> {
  onSubmit: (e: any) => void;
  onCancel: (e: any) => void;
  pageTitle: string;
}

const FormToolbar: FC<IProps> = props => {
  const { onSubmit, onCancel, pageTitle, classes } = props;
  return (
    <Toolbar>
      <IconButton className={classes.leftButton} onClick={onCancel} color="inherit" aria-label="Άκυρο" title="Άκυρο">
        <CloseIcon />
      </IconButton>
      <PageTitle pageTitle={pageTitle} />

      {/* <Button color="inherit">ΑΠΟΘΗΚΕΥΣΗ</Button> */}
      <IconButton
        onClick={onSubmit}
        color="inherit"
        aria-label="Αποθήκευση"
        title="Αποθήκευση"
      >
        <CheckIcon />
      </IconButton>
    </Toolbar>
  );
};

const styles = (theme: any) =>
  createStyles({
    leftButton: {
      marginLeft: -12,
      marginRight: 20,
    },
  });

export default withStyles(styles)(FormToolbar);
