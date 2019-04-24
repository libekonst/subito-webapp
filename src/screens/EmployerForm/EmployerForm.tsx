import React, { FC, useState, ChangeEvent } from 'react';
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
import { isNumeric, getErrors } from './validation';
import Button from '@material-ui/core/Button';

interface IProps extends WithStyles<typeof styles> {}
const EmployerForm: FC<IProps> = props => {
  const { classes } = props;
  const variant = 'standard';

  const [values, setValues] = useState<IEmployer>({
    name: '',
    vat: '',
    ame: '',
    smsNumber: '',
  });
  const [errors, setErrors] = useState<IEmployerErrors>({});
  const handleChange = (val: keyof IEmployer) => (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    switch (val) {
      case 'vat':
        if (!isNumeric.test(value) && value !== '') return;
        if (value.length > 9) return;
        break;
      case 'smsNumber':
      case 'ame':
        if (!isNumeric.test(value) && value !== '') return;
        if (value.length > 10) return;
        break;
      case 'name':
        if (value.length > 255) return;
        break;
      default:
        break;
    }

    const newValues = { ...values, [val]: value };
    setValues(newValues);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = getErrors(values);
    setErrors(validationErrors);

    if (Object.values(validationErrors).reduce((acc, val) => acc && val, true))
      return console.log(validationErrors);

    return console.log(values);
  };
  return (
    <>
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
          <TextField variant={variant} label="Όνομα" className={classes.textField} />
        </ListItem>
        <ListItem key="employer-vat">
          <ListItemIcon>
            <WorkIcon />
          </ListItemIcon>
          <TextField
            value={values.vat}
            onChange={handleChange('vat')}
            variant={variant}
            type="tel"
            label="ΑΦΜ"
            className={classes.textField}
          />
        </ListItem>
        <ListItem key="employer-ame">
          <ListItemIcon>
            <WorkTwoToneIcon />
          </ListItemIcon>
          <TextField
            onChange={handleChange('ame')}
            value={values.ame}
            variant={variant}
            type="tel"
            label="ΑΜΕ (προαιρετικό)"
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
            onChange={handleChange('smsNumber')}
            variant={variant}
            type="tel"
            label="Αριθμός Παραλήπτη"
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
      <Button onClick={handleSubmit}>ΣΑΜΠ ΜΙΤ</Button>
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
