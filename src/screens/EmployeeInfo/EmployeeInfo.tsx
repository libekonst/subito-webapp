import React, { FC } from 'react';
import SmsList from '../../components/SmsList';
import { IE8Sms, IEmployee } from '../../interfaces';
import { Redirect, withRouter, RouteComponentProps } from 'react-router';
import { EmployeeInfoToolbar, AppBar } from '../../components/AppShell';

interface IProps {
  employee?: IEmployee;
}

const EmployeeInfo: FC<IProps & RouteComponentProps> = props => {
  const { employee, history } = props;

  // if (!props.employee && !location.state) return <Redirect to="/" />;
  // if (!location.state.vat) return <Redirect to="/" />;

  const smsFactory = () => ({
    employee: {
      name: employee ? employee.name : 'No employee found',
      vat: '104957382',
      workStart: new Date(),
      workFinish: new Date(),
    },
    overtimeStart: new Date(),
    overtimeFinish: new Date(),
    dateSent: new Date(),
    approved: Math.random() >= 0.3,
  });

  const list: IE8Sms[] = Array(30)
    .fill(0)
    .map(smsFactory);

  return (
    <>
      {employee && (
        <AppBar>
          <EmployeeInfoToolbar onGoBack={history.goBack} employee={employee} />
        </AppBar>
      )}
      <SmsList smsList={list} />
    </>
  );
};

export default withRouter(EmployeeInfo);
