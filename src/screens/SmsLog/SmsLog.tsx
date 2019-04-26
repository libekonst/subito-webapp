import React, { FC } from 'react';
import SmsList from '../../components/SmsList';
import { IE8Sms } from '../../interfaces';
import { withRouter, RouteComponentProps, Route, Switch } from 'react-router';
import { AppBar, DeadEndToolbar } from '../../components/AppShell';

interface IProps {}

const SmsLog: FC<IProps & RouteComponentProps> = props => {
  const { history } = props;
  const smsFactory = () => ({
    employee: {
      name: 'Γιάννης Χιονίδης',
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
  return (
    <>
      <AppBar>
        <DeadEndToolbar pageTitle="Λίστα Sms" onGoBack={history.goBack} />
      </AppBar>
      <SmsList smsList={list} />
    </>
  );
};

export default withRouter(SmsLog);
