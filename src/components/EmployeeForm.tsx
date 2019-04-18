import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ButtonsAppBar from './ButtonsAppBar';



export const EmployeeForm: FC = props => {
  return (
    <div>
      <ButtonsAppBar title='Αποθήκευση υπαλλήλου' />
    </div>
  );
};
