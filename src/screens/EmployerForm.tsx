import React, { FC } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import TextField from '@material-ui/core/TextField';
import FormAppbar from '../components/FormAppbar';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountIcon from '@material-ui/icons/AccountCircle';
import WorkIcon from '@material-ui/icons/Work';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import PhoneIcon from '@material-ui/icons/Phone';
import WorkTwoToneIcon from '@material-ui/icons/WorkOutline';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { stickyTopWithAppbar } from '../styles/mixins';
import Divider from '@material-ui/core/Divider';

interface IProps extends WithStyles<typeof styles> {}
const EmployerForm: FC<IProps> = props => {
  const { classes } = props;
  const handleCancel = () => null;
  const handleSubmit = () => null;
  const variant = 'standard';
  return (
    <>
      <FormAppbar
        pageTitle="Ρυθμίσεις"
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
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
            variant={variant}
            label="Όνομα"
            className={classes.textField}
            // InputProps={{
            //   endAdornment: (
            //     <InputAdornment position="end">{<AccountIcon />}</InputAdornment>
            //   ),
            // }}
          />
        </ListItem>
        <ListItem key="employer-vat">
          <ListItemIcon>
            <WorkIcon />
          </ListItemIcon>
          <TextField
            variant={variant}
            type="tel"
            label="ΑΦΜ"
            className={classes.textField}
            // InputProps={{
            //   endAdornment: (
            //     <InputAdornment position="end">{<WorkIcon />}</InputAdornment>
            //   ),
            // }}
          />
        </ListItem>
        <ListItem key="employer-ame">
          <ListItemIcon>
            <WorkTwoToneIcon />
          </ListItemIcon>
          <TextField
            variant={variant}
            type="tel"
            label="ΑΜΕ (προαιρετικό)"
            className={classes.textField}
            // InputProps={{
            //   endAdornment: (
            //     <InputAdornment position="end">
            //       {<WorkTwoToneIcon />}
            //     </InputAdornment>
            //   ),
            // }}
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
            variant={variant}
            type="tel"
            label="Αριθμός Παραλήπτη"
            className={classes.textField}
            // InputProps={{
            //   endAdornment: (
            //     <InputAdornment position="end">{<PhoneIcon />}</InputAdornment>
            //   ),
            // }}
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
export default withStyles(styles)(EmployerForm);
