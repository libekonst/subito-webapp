import React, { FC } from 'react';
import SmsList from '../../components/SmsList';
import { IE8Sms, IEmployee } from '../../interfaces';
import { Redirect, withRouter, RouteComponentProps } from 'react-router';

interface IProps {
  employee?: IEmployee;
}

const EmployeeInfo: FC<IProps> = props => {
  const { employee } = props;

  // if (!props.employee && !location.state) return <Redirect to="/" />;
  // if (!location.state.vat) return <Redirect to="/" />;

  const smsFactory = () => ({
    employee: {
      name: employee ? employee.name : 'No employee found',
      vat: '104957382',
      workStart: '08:00',
      workFinish: '14:00',
    },
    overtimeStart: '14:00',
    overtimeFinish: '15:00',
    dateSent: new Date(),
    approved: Math.random() >= 0.3,
  });

  const list: IE8Sms[] = Array(30)
    .fill(0)
    .map(smsFactory);
  return <SmsList smsList={list} />;
};

export default EmployeeInfo;
