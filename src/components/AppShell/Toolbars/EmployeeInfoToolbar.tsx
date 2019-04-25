import React, { FC } from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import LeftIconButton from './LeftIconButton';
import Button from '@material-ui/core/Button';

import ExpandableListTile from '../../../screens/E8Form/ExpandableListTile';
import { IEmployee } from '../../../interfaces';

interface IProps extends WithStyles<typeof styles> {
  employee?: IEmployee;
  onGoBack?: (e: any) => void;
}

const EmployeeInfo: FC<IProps> = props => {
  const { classes, employee, onGoBack } = props;

  return (
    <>
      <Toolbar className={classes.mainToolbar}>
        <LeftIconButton
          onClick={onGoBack}
          color="primary"
          aria-label="Πίσω"
          title="Πίσω"
        >
          <ArrowBackIcon />
        </LeftIconButton>
        <ExpandableListTile employee={employee} className={classes.listItem} />
      </Toolbar>
      <Toolbar className={classes.secondaryToolbar}>
        <Button color="primary" variant="text" aria-label="Διαγραφή" title="Διαγραφή">
          ΔΙΑΓΡΑΦΗ
          <DeleteIcon className={classes.rightIcon} />
        </Button>
        <Button
          color="primary"
          variant="text"
          aria-label="Επεξεργασία"
          title="Επεξεργασία"
        >
          ΕΠΕΞΕΡΓΑΣΙΑ
          <EditIcon className={classes.rightIcon} />
        </Button>
      </Toolbar>
    </>
  );
};

const styles = (theme: any) =>
  createStyles({
    listItem: {
      paddingLeft: 0,
      paddingRight: 0,
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
