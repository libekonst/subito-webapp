import React, { FC } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import TextField from '@material-ui/core/TextField';
import AccountIcon from '@material-ui/icons/AccountCircle';
import WorkIcon from '@material-ui/icons/Work';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import PhoneIcon from '@material-ui/icons/Phone';
import WorkTwoToneIcon from '@material-ui/icons/WorkOutline';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { stickyTopWithAppbar } from '../../styles/mixins';
import { IEmployer, IEmployerErrors } from '../../interfaces';
import Button from '@material-ui/core/Button';
import { AppBar, FormToolbar } from '../../components/AppShell';
import { withRouter, RouteComponentProps } from 'react-router';
import Fade from '@material-ui/core/Fade';

interface IProps extends WithStyles<typeof styles> {
  onChange: (val: keyof IEmployer) => (e: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  values: IEmployer;
  errors: IEmployerErrors;
}

const View: FC<IProps & RouteComponentProps> = props => {
  const { classes, onChange, onSubmit, errors, values, history } = props;
  const variant = 'standard';

  return (
    <>
      <AppBar color="primary">
        <FormToolbar
          onCancel={history.goBack}
          onSubmit={onSubmit}
          pageTitle="Ρυθμίσεις"
        />
      </AppBar>
      <Fade in>
        <div>
          <List
            className={classes.list}
            subheader={
              <ListSubheader color="primary" className={classes.listHeader}>
                Στοιχεία Εργοδότη
              </ListSubheader>
            }
          >
            <ListItem key="employer-name">
              <ListItemIcon>
                <AccountIcon />
              </ListItemIcon>
              <TextField
                value={values.name}
                onChange={onChange('name')}
                error={!!errors.name}
                label={errors.name || 'Ονοματεπώνυμο'}
                variant={variant}
                className={classes.textField}
              />
            </ListItem>
            <ListItem key="employer-vat">
              <ListItemIcon>
                <WorkIcon />
              </ListItemIcon>
              <TextField
                value={values.vat}
                onChange={onChange('vat')}
                error={!!errors.vat}
                label={errors.vat || 'ΑΦΜ'}
                variant={variant}
                type="tel"
                className={classes.textField}
              />
            </ListItem>
            <ListItem key="employer-ame">
              <ListItemIcon>
                <WorkTwoToneIcon />
              </ListItemIcon>
              <TextField
                value={values.ame}
                onChange={onChange('ame')}
                error={!!errors.ame}
                label={errors.ame || 'ΑΜΕ (προαιρετικό)'}
                variant={variant}
                type="tel"
                className={classes.textField}
              />
            </ListItem>
          </List>
          <List
            className={classes.list}
            subheader={
              <ListSubheader color="primary" className={classes.listHeader}>
                Επιλογές SMS
              </ListSubheader>
            }
          >
            <ListItem key="sms-number">
              <ListItemIcon>
                <PhoneIcon />
              </ListItemIcon>
              <TextField
                value={values.smsNumber}
                onChange={onChange('smsNumber')}
                error={!!errors.smsNumber}
                label={errors.smsNumber || 'Αριθμός Παραλήπτη'}
                variant={variant}
                type="tel"
                className={classes.textField}
              />
            </ListItem>
            <div className={classes.infoTileWrapper}>
              <ListItem key="info" dense className={classes.infoTile}>
                <ListItemIcon>
                  <InfoIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Για την υποβολή αίτησης Ε8 με SMS, τα μηνύματα αποστέλλονται στον αριθμό 54001." />
              </ListItem>
            </div>
          </List>
        </div>
      </Fade>
    </>
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
    infoTileWrapper: {
      paddingLeft: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
    },
    infoTile: {
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.spacing.unit,
    },
  });

export default withStyles(styles)(withRouter(View));
