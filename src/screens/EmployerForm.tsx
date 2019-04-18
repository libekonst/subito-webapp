import React, { FC, useState } from 'react';
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
      <main className={classes.main}>
        <List
          className={classes.list}
          subheader={<ListSubheader color="primary">Στοιχεία Εργοδότη</ListSubheader>}
        >
          <ListItem key="employer-name">
            <TextField
              variant={variant}
              label="Όνομα"
              className={classes.textField}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <AccountIcon />
                  </InputAdornment>
                ),
              }}
            />
          </ListItem>
          <ListItem key="employer-vat">
            <TextField
              variant={variant}
              type="tel"
              label="ΑΦΜ"
              className={classes.textField}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <WorkIcon />
                  </InputAdornment>
                ),
              }}
            />
          </ListItem>
          <ListItem key="employer-ame">
            <TextField
              variant={variant}
              type="tel"
              label="ΑΜΕ (προαιρετικό)"
              className={classes.textField}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <WorkTwoToneIcon />
                  </InputAdornment>
                ),
              }}
            />
          </ListItem>
        </List>
        <List
          className={classes.list}
          subheader={<ListSubheader color="primary">Επιλογές SMS</ListSubheader>}
        >
          <ListItem key="sms-number">
            <TextField
              variant={variant}
              type="tel"
              label="Αριθμός Παραλήπτη"
              className={classes.textField}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <PhoneIcon />
                  </InputAdornment>
                ),
              }}
            />
          </ListItem>
          <ListItem key="info" dense>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="Για την υποβολή αίτησης Ε8 με SMS, τα μηνύματα αποστέλλονται στον αριθμό 54001." />
          </ListItem>
        </List>
      </main>
    </>
  );
};

const styles = (theme: any) =>
  createStyles({
    main: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      backgroundColor: theme.palette.background.paper,
    },
    list: {
      width: '100%',
      maxWidth: 600,
      backgroundColor: theme.palette.background.paper,
      '&:not(:first-child)': {
        marginTop: 40,
      },
    },
    textField: {
      width: '100%',
    },
  });
export default withStyles(styles)(EmployerForm);
