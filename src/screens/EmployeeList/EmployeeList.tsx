import React, { FC } from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import EmployeeListItem from './EmployeeListItem';
import { IEmployee } from '../../interfaces/IEmployee';

interface IProps extends WithStyles<typeof styles> {
  classes: any;
  employees: IEmployee[];
}
const EmployeeList: FC<IProps> = props => {
  const { classes, employees } = props;

  return (
    <List className={classes.list}>
      {employees.map(e => (
        <EmployeeListItem employee={e} />
      ))}
    </List>
  );
};

const styles = () =>
  createStyles({
    list: {
      width: '100%',
      margin: 'auto',
    },
  });

export default withStyles(styles)(EmployeeList);
