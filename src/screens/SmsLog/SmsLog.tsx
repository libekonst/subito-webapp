import React, { FC, useState, useEffect } from 'react';
import SmsList from '../../components/SmsList';
import { IE8Sms } from '../../interfaces';
import { withRouter, RouteComponentProps, Route, Switch } from 'react-router';
import {
  AppBar,
  DeadEndToolbar,
  DrawerToolbar,
  AppDrawer,
} from '../../components/AppShell';
import IconButton from '@material-ui/core/IconButton';
import BackupIcon from '@material-ui/icons/Backup';
import dexieDb from '../../db/db';

interface IProps {}

const SmsLog: FC<IProps & RouteComponentProps> = props => {
  const { history } = props;

  const smsFactory = () => ({
    employee: {
      name: 'Γιάννης Χιονίδης',
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

  const [smsList, setSmsList] = useState<IE8Sms[]>(list);
  useEffect(() => {
    async function fetchSmses() {
      const smses = await dexieDb.sms.toArray();
      if (!smses.length) return;
      setSmsList(smses);
    }
    fetchSmses();
  }, []);

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
      <SmsList smsList={smsList} />
    </>
  );
};

export default withRouter(SmsLog);
