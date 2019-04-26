import React, { FC, Component } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PageTitle from './PageTitle';
import LeftIconButton from './LeftIconButton';

interface IProps {
  onSubmit?: (e: any) => void;
  onCancel?: (e: any) => void;
  pageTitle: string;
}

const FormToolbar: FC<IProps> = props => {
  const { onSubmit, onCancel, pageTitle } = props;
  return (
    <Toolbar>
      <LeftIconButton onClick={onCancel} aria-label="Άκυρο" title="Άκυρο">
        <CloseIcon />
      </LeftIconButton>

      <PageTitle pageTitle={pageTitle} />

      <Button
        color="inherit"
        size="small"
        onClick={onSubmit}
        aria-label="Αποθήκευση"
        title="Αποθήκευση"
      >
        ΑΠΟΘΗΚΕΥΣΗ
      </Button>
      {/* <IconButton
        onClick={onSubmit}
        color="inherit"
        aria-label="Αποθήκευση"
        title="Αποθήκευση"
      >
        <CheckIcon />
      </IconButton> */}
    </Toolbar>
  );
};

export default FormToolbar;
