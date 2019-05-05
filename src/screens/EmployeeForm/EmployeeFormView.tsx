import React, { FC } from 'react';
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles';
import WorkIcon from '@material-ui/icons/Work';
import TextField from '@material-ui/core/TextField';
import { stickyTopWithAppbar } from '../../styles/mixins';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import AccountIcon from '@material-ui/icons/AccountCircle';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import WorkHourPicker from '../../components/WorkHourPicker';
import { IEmployeeErrors } from '../../interfaces/IEmployeeErrors';
import Button from '@material-ui/core/Button';
import { AppBar, FormToolbar } from '../../components/AppShell';
import { withRouter, RouteComponentProps } from 'react-router';
import { IEmployee } from '../../interfaces';
import Slide from '@material-ui/core/Slide';
import Fade from '@material-ui/core/Fade';
import CenteredSpinner from '../../components/CenteredSpinner';
import NotFound from '../../components/NotFound';

interface IProps extends WithStyles<typeof styles> {
  employee?: IEmployee;
  errors: IEmployeeErrors;
  handleChange: any;
  values: any;
  workStart: any;
  workFinish: any;
  setWorkStart: any;
  setWorkFinish: any;
  handleSubmit: any;
  isLoading: boolean;
}
interface IMatchParams {
  employeeID?: string;
}
const EmployeeFormView: FC<IProps & RouteComponentProps<IMatchParams>> = props => {
  const variant = 'standard';
  const {
    classes,
    errors,
    handleChange,
    values,
    workStart,
    workFinish,
    setWorkStart,
    setWorkFinish,
    handleSubmit,
    history,
    isLoading,
    employee,
  } = props;
  const { employeeID } = props.match.params;
  return (
    <div>
      <AppBar color="primary">
        <FormToolbar
          pageTitle={employeeID ? 'Επεξεργασία' : 'Νέος υπάλληλος'}
          onCancel={history.goBack}
          onSubmit={handleSubmit}
        />
      </AppBar>
      {isLoading && <CenteredSpinner />}
      <Fade in={!isLoading}>
        <div>
          {employeeID && !employee && (
            <NotFound icon="sadface" message="Δεν βρέθηκε ο υπάλληλος" />
          )}
          {(!employeeID || employee) && (
            <>
              <List
                className={classes.list}
                subheader={
                  <ListSubheader color="primary" className={classes.listHeader}>
                    Στοιχεία υπαλλήλου
                  </ListSubheader>
                }
              >
                <ListItem key="employee-fullname">
                  <ListItemIcon>
                    <AccountIcon />
                  </ListItemIcon>
                  <TextField
                    variant={variant}
                    label={errors.name || 'Ονοματεπώνυμο'}
                    error={!!errors.name}
                    value={values.name}
                    onChange={handleChange('name')}
                    className={classes.textField}
                  />
                </ListItem>
                <ListItem key="employee-vat">
                  <ListItemIcon>
                    <WorkIcon />
                  </ListItemIcon>
                  <TextField
                    variant={variant}
                    type="tel"
                    label={errors.vat || 'ΑΦΜ'}
                    error={!!errors.vat}
                    value={values.vat}
                    onChange={handleChange('vat')}
                    className={classes.textField}
                  />
                </ListItem>
              </List>
              <List
                className={classes.list}
                subheader={
                  <ListSubheader color="primary" className={classes.listHeader}>
                    Τυπικό ωράριο εργασίας
                  </ListSubheader>
                }
              >
                <ListItem key="WorkHour">
                  <WorkHourPicker
                    labelStart="Ώρα Έναρξης"
                    labelFinish="Ώρα Λήξης"
                    valueStart={workStart}
                    valueFinish={workFinish}
                    onChangeStart={setWorkStart}
                    onChangeFinish={setWorkFinish}
                  />
                </ListItem>
              </List>
            </>
          )}
        </div>
      </Fade>
    </div>
  );
};
const styles = (theme: Theme) =>
  createStyles({
    list: {
      width: '100%',
      maxWidth: 600,
      '&:not(:first-child)': {
        marginTop: '2rem',
      },
    },
    listHeader: {
      backgroundColor: theme.palette.background.default,
      ...stickyTopWithAppbar,
    },
    textField: {
      width: '100%',
    },
  });

export default withStyles(styles)(EmployeeFormView);
