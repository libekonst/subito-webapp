import React, { FC, useState, useEffect } from 'react';
import SmsList from '../../components/SmsList';
import { IE8Sms } from '../../interfaces';
import { AppBar, DrawerToolbar, AppDrawer } from '../../components/AppShell';
import IconButton from '@material-ui/core/IconButton';
import BackupIcon from '@material-ui/icons/Backup';
import dexieDb from '../../db/db';
import Fade from '@material-ui/core/Fade';
import { ExportToCsv } from 'export-to-csv';
import { format } from 'date-fns';

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

  function handleExportToCSV() {
    const data = smsList.map(sms => {
      return {
        Υπάλληλος: sms.employee.name,
        'Έναρξη υπερωρίας': format(sms.overtimeStart, 'HH:mm'),
        'Λήξη υπερωρίας': format(sms.overtimeFinish, 'HH:mm'),
        'Ημερομηνία αποστολής': format(sms.dateSent, 'dd/MM/yyyy HH:mm'),
        'Δεκτή απο Εργάνη': sms.approved ? 'ΝΑΙ' : 'ΟΧΙ',
      };
    });

    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Μηνύματα Εργάνη',
      filename: 'Μηνύματα Εργάνη',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };
    const csvExporter = new ExportToCsv(options);

    csvExporter.generateCsv(data);
  }

  const [drawerState, setDrawerState] = useState(false);
  const toggleDrawerState = () => setDrawerState(!drawerState);
  return (
    <>
      <AppBar color="primary">
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
      <Fade in={!!smsList.length}>
        <div>
          <SmsList smsList={smsList} />
        </div>
      </Fade>
    </>
  );
};

export default SmsLog;
