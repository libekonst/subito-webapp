import React, { FC, useState, useEffect } from 'react';
import SmsList from '../../components/SmsList';
import { IE8Sms } from '../../interfaces';
import { AppBar, DrawerToolbar, AppDrawer } from '../../components/AppShell';
import IconButton from '@material-ui/core/IconButton';
import BackupIcon from '@material-ui/icons/Backup';
import dexieDb from '../../db/db';

const SmsLog: FC = props => {
  const [smsList, setSmsList] = useState<IE8Sms[]>([]);
  useEffect(() => {
    async function fetchSmsList() {
      let smsList: IE8Sms[] = [];
      try {
        smsList = await dexieDb.sms.toArray();
      } catch (error) {
        console.log(error);
      }
      setSmsList(smsList);
    }
    fetchSmsList();
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

export default SmsLog;
