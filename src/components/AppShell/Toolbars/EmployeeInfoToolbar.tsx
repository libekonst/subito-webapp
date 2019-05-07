import React, { FC } from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import LeftIconButton from './LeftIconButton';
import Button from '@material-ui/core/Button';

import ExpandableListTile from '../../ExpandableListTile';
import { IEmployee } from '../../../interfaces';
import { Link } from 'react-router-dom';
import { routes } from '../../../routes';

interface IProps extends WithStyles<typeof styles> {
  employee: IEmployee;
  onGoBack?: (e: any) => void;
  onDelete: (e: any) => void;
}

const EmployeeInfo: FC<IProps> = props => {
  const { classes, employee, onGoBack, onDelete } = props;
  const LinkToEmployeeForm = (props: any) => (
    <Link {...props} to={`${routes.EMPLOYEE_FORM}/${employee.id}`} />
  );
  return (
    <Toolbar className={classes.mainToolbar}>
      <LeftIconButton onClick={onGoBack} color="inherit" aria-label="Πίσω" title="Πίσω">
        <ArrowBackIcon />
      </LeftIconButton>
      <ExpandableListTile employee={employee} className={classes.listItem} expanded />
    </Toolbar>
  );
};

const styles = (theme: any) =>
  createStyles({
    listItem: {
      paddingLeft: 0,
      paddingRight: 0,
      marginLeft: 0,
    },
    mainToolbar: {
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    secondaryToolbar: {
      justifyContent: 'space-around',
      flexWrap: 'wrap',
    },

    rightIcon: {
      marginLeft: theme.spacing.unit,
    },
  });

export default withStyles(styles)(EmployeeInfo);
