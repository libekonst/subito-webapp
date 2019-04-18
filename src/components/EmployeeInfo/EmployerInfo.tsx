import React, { FC } from 'react';
import { withStyles } from '@material-ui/core/styles';
import EmployeeInfoHeader from './EmployeeInfoHeader';
import SmsList from './SmsList';

const styles = {
  card: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};
interface IProps {
  classes: any;
}

const EmployeeInfo: FC<IProps> = props => {
  const { classes } = props;

  return (
    <>
      <EmployeeInfoHeader />
      <SmsList />
    </>
  );
};

export default withStyles(styles)(EmployeeInfo);
