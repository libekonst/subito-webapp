import React, { FC, useState } from 'react';
import SmsList from '../../components/SmsList';
import { IE8Sms } from '../../interfaces';
import { withRouter, RouteComponentProps, Route, Switch } from 'react-router';
import { AppBar, DeadEndToolbar, DrawerToolbar, AppDrawer } from '../../components/AppShell';
import IconButton from '@material-ui/core/IconButton';
import BackupIcon from '@material-ui/icons/Backup';

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
  const [drawerState, setDrawerState] = useState(false);
  const toggleDrawerState = () => setDrawerState(!drawerState);
  return (
    <>
      <AppBar color="primary">
        <DrawerToolbar
          onOpenDrawer={toggleDrawerState}
          pageTitle="Λίστα Sms"
          secondaryActions={
            <IconButton color="inherit">
              <BackupIcon />
            </IconButton>
          }
        />
      </AppBar>
      <AppDrawer toggleOpen={toggleDrawerState} isOpen={drawerState} />
      <SmsList smsList={list} />
    </>
  );
};

export default withRouter(SmsLog);
