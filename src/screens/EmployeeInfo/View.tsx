import React, { FC } from 'react';
import SmsList from '../../components/SmsList';
import { EmployeeInfoToolbar, AppBar, DeadEndToolbar } from '../../components/AppShell';
import Fade from '@material-ui/core/Fade';
import SaveIcon from '@material-ui/icons/Save';
import CircularProgress from '@material-ui/core/CircularProgress';
import NotFound from '../../components/NotFound';
import { IE8Sms, IEmployee } from '../../interfaces';
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles';
import CenteredSpinner from '../../components/CenteredSpinner';
import Fab from '@material-ui/core/Fab';

interface IProps extends WithStyles<typeof styles> {
  isFetchingEmployee: boolean;
  isFetchingSms: boolean;
  employee?: IEmployee;
  smsList: IE8Sms[];
  handleDelete: (e: any) => void;
  onGoBack?: (e: any) => void;
  handleExportCSV: () => void;
}
const View: FC<IProps> = props => {
  const { classes } = props;
  // const Spinner = <CenteredSpinner />;
  return (
    <>
      <AppBar>
        {props.isFetchingEmployee && <CenteredSpinner />}
        <Fade in={!props.isFetchingEmployee}>
          <div>
            {props.employee ? (
              <EmployeeInfoToolbar
                onGoBack={props.onGoBack}
                employee={props.employee}
                onDelete={props.handleDelete}
              />
            ) : (
              <DeadEndToolbar
                pageTitle="Δεν βρέθηκε υπάλληλος"
                onGoBack={props.onGoBack}
              />
            )}
          </div>
        </Fade>
      </AppBar>
      {!props.isFetchingEmployee && props.isFetchingSms && <CenteredSpinner />}
      <Fade in={!props.isFetchingEmployee && !props.isFetchingSms}>
        {props.smsList.length !== 0 ? (
          <div>
            <SmsList smsList={props.smsList} />
            <Fab
              onClick={props.handleExportCSV}
              color="primary"
              aria-label="csv"
              className={classes.fab}
              title="Αποθήκευση σε CSV"
            >
              <SaveIcon />
            </Fab>
          </div>
        ) : (
          <div>
            {!!props.employee && props.smsList.length === 0 && (
              <NotFound
                icon="message"
                message="Δεν βρέθηκαν μηνύματα για αυτόν τον υπάλληλο"
              />
            )}
            {!props.isFetchingEmployee && !props.employee && (
              <NotFound
                message="Δεν βρέθηκε υπάλληλος με αυτά τα στοιχεία"
                icon="sadface"
              />
            )}
          </div>
        )}
      </Fade>
    </>
  );
};

const styles = (theme: Theme) =>
  createStyles({
    spinner: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: theme.spacing.unit * 10,
      padding: theme.spacing.unit * 3,
    },
    fab: {
      position: 'fixed',
      bottom: 0,
      right: 0,
      margin: theme.spacing.unit * 2,
    },
  });

export default withStyles(styles)(View);
