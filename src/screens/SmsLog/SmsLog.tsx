import React, { FC, useState, useEffect } from 'react';
import SmsList from '../../components/SmsList';
import { IE8Sms } from '../../interfaces';
import { AppBar, DrawerToolbar, AppDrawer } from '../../components/AppShell';
import IconButton from '@material-ui/core/IconButton';
import BackupIcon from '@material-ui/icons/Backup';
import dexieDb from '../../db/db';
import Fade from '@material-ui/core/Fade';
import exportToCsvSmsList from '../../utils/exportToCSV';
import CenteredSpinner from '../../components/CenteredSpinner';
import EmptyList from '../../components/EmptyList';

const SmsLog: FC = props => {
  const [smsList, setSmsList] = useState<IE8Sms[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchSmsList() {
      let smsList: IE8Sms[] = [];
      try {
        smsList = await dexieDb.sms.toArray();
      } catch (error) {
        console.log(error);
      }
      setSmsList(smsList);
      setIsLoading(false);
    }
    fetchSmsList();
  }, []);

  const handleExportToCSV = () => exportToCsvSmsList(smsList);

  const [drawerState, setDrawerState] = useState(false);
  const toggleDrawerState = () => setDrawerState(!drawerState);
  return (
    <>
      <AppBar color="default">
        <DrawerToolbar
          onOpenDrawer={toggleDrawerState}
          pageTitle="Λίστα Sms"
          secondaryActions={
            <IconButton color="inherit" onClick={handleExportToCSV}>
              <BackupIcon />
            </IconButton>
          }
        />
      </AppBar>
      <AppDrawer toggleOpen={toggleDrawerState} isOpen={drawerState} />
      {isLoading && <CenteredSpinner />}
      {!isLoading && (
        <Fade in={!isLoading}>
          <div>
            {smsList.length === 0 && (
              <EmptyList icon="message" message="Δεν βρέθηκαν μηνύματα" />
            )}
            {smsList.length !== 0 && <SmsList smsList={smsList} />}
          </div>
        </Fade>
      )}
    </>
  );
};

export default SmsLog;
