import React, { FC, useState, useEffect } from 'react';
import SmsList from '../../components/SmsList';
import { IE8Sms } from '../../interfaces';
import {
  AppBar,
  DrawerToolbar,
  AppDrawer,
  DeadEndToolbar,
} from '../../components/AppShell';
import IconButton from '@material-ui/core/IconButton';
import BackupIcon from '@material-ui/icons/Backup';
import dexieDb from '../../db/db';
import Fade from '@material-ui/core/Fade';
import exportToCsvSmsList from '../../utils/exportToCSV';
import CenteredSpinner from '../../components/CenteredSpinner';
import NotFound from '../../components/NotFound';
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/SaveAlt';
import { RouteComponentProps } from 'react-router';

const SmsLog: FC<RouteComponentProps> = props => {
  const { history } = props;
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

  return (
    <>
      <AppBar>
        <DeadEndToolbar pageTitle="Λίστα Sms" onGoBack={history.goBack} />
      </AppBar>
      {isLoading && <CenteredSpinner />}
      {!isLoading && (
        <Fade in={!isLoading}>
          <div>
            {smsList.length === 0 && (
              <NotFound icon="message" message="Τα μηνύματα Ε8 θα εμφανίζονται εδώ" />
            )}
            {smsList.length !== 0 && (
              <>
                <SmsList smsList={smsList} />
                <Fab
                  onClick={handleExportToCSV}
                  color="primary"
                  aria-label="csv"
                  title="Αποθήκευση σε CSV"
                  style={{
                    position: 'fixed',
                    bottom: 0,
                    right: 0,
                    margin: 16,
                  }}
                >
                  <SaveIcon />
                </Fab>
              </>
            )}
          </div>
        </Fade>
      )}
    </>
  );
};

export default SmsLog;
